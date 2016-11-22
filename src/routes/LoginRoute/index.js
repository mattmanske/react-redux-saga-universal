//-----------  Imports  -----------//

import { connect } from 'react-redux'

//-----------  Redux Maps  -----------//

const mapState = () => ({
  destroyOnUnmount        : false,
  keepDirtyOnReinitialize : true
})

const mapDispatch = (dispatch) => ({
  onSubmit(formData){
    console.log('Signup:', formData);
    return new Promise((resolve, reject) => resolve())
  }
})

//-----------  Exports  -----------//

if (typeof require.ensure !== 'function')
  require.ensure = (deps, cb) => cb(require)

export default {
  path: 'login',
  getComponent(location, cb){
    require.ensure([], (require) => {
      cb(null, connect(mapState, mapDispatch)(require('./LoginRoute')))
    }, 'login')
  }
}
