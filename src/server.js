//-----------  Imports  -----------//

import url                     from 'url'
import path                    from 'path'
import http                    from 'http'
import Express                 from 'express'
import React                   from 'react'
import ReactDOMServer          from 'react-dom/server'
import favicon                 from 'serve-favicon'
import compression             from 'compression'
import proxy                   from 'express-http-proxy'
import PrettyError             from 'pretty-error'
import { match,
         createMemoryHistory } from 'react-router'

import getRoutes               from 'routes'
import AppRoot                 from 'containers/AppRoot'
import configureStore          from 'store/configureStore'
import { waitAll }             from 'modules/rootSaga'
import Html                    from 'helpers/Html'

import config                  from './config'

//-----------  Definitions  -----------//

const API_BASE        = 'http://oauthbin.com/v1'
const CONSUMER_KEY    = 'key'
const CONSUMER_SECRET = 'secret'

const pretty = new PrettyError()
const app    = new Express()
const server = new http.Server(app)

//-----------  Configuration  -----------//

// disable `X-Powered-By` HTTP header
app.disable('x-powered-by')

// Enable proxy
// app.enable('trust proxy')

app.use(compression())
app.use(favicon(path.join(__dirname, '..', 'static', 'favicon.ico')))
app.use(Express.static(path.join(__dirname, '..', 'static')))

//-----------  API  -----------//

app.use('/api', proxy(config.apiBaseUrl, {
 forwardPath: (req, res) => url.parse(req.url).path
}))

//-----------  App  -----------//

app.use((req, res) => {
  
  if (__DEVELOPMENT__)
    webpackIsomorphicTools.refresh()

  const memoryHistory = createMemoryHistory()
  const store         = configureStore(memoryHistory)
  const allRoutes     = getRoutes(store)
  const assets        = webpackIsomorphicTools.assets()

  function hydrateOnClient(){
    const htmlComponent = <Html assets={assets} store={store} />
    const renderedDomString = ReactDOMServer.renderToString(htmlComponent)
    res.send(`<!doctype html>\n ${renderedDomString}`)
  }

  if (__DISABLE_SSR__){
    hydrateOnClient()
    return
  }

  match({ routes: allRoutes, location: req.url }, (error, redirectLocation, renderProps) => {
    if (redirectLocation){
      res.redirect(redirectLocation.pathname + redirectLocation.search)
    } else if (error){
      console.error('ROUTER ERROR:', pretty.render(error))
      res.status(500)
      hydrateOnClient()
    } else if (renderProps){
      const rootComponent = (
        <AppRoot
          store={store}
          routes={allRoutes}
          history={memoryHistory}
          renderProps={renderProps}
          isServer={true}
        />
      )

      const preloaders = renderProps.components
        .filter((component) => component && component.preload)
        .map((component) => component.preload(renderProps.params, req))
        .reduce((result, preloader) => result.concat(preloader), [])

      store.runSaga(waitAll(preloaders)).done.then(() => {
        global.navigator = { userAgent: req.headers['user-agent'] }

        const htmlComponent = <Html assets={assets} component={rootComponent} store={store} />
        const renderedDomString = ReactDOMServer.renderToString(htmlComponent)
        res.status(200).send(`<!doctype html>\n ${renderedDomString}`)
      }).catch((e) => {
        console.log(e.stack)
      })
    } else {
      res.status(404).send('Not found')
    }
  })
})

//-----------  Logging  -----------//

if (config.port){
  server.listen(config.port, (err) => {
    if (err)
      console.error(err)

    console.info('==> 💻  Open http://%s:%s in a browser to view the app.', config.host, config.port)
  })
} else {
  console.error('==>     ERROR: No PORT environment variable has been specified')
}
