import React from 'react'
import { Field, reduxForm } from 'redux-form'
import Example from '../example'

const renderField = ({ input, label, type, meta: { touched, error } }) => (
  <div>
    <label>{label}</label>
    <div>
      <input className='form-control' {...input} placeholder={label} type={type}/>
      {touched && error && <span>{error}</span>}
    </div>
  </div>
)

function StepOne(props) {
  return (
    <div>
      <h2> Hey dear user first we need your company data</h2>
      <Field name="Company name" component={renderField} type="text" label="Company name"/>
      <Field name="Company industry" component={renderField} type="text" label="Company industry"/>
       <div style={{marginTop: 20}}>
          <button className='btn btn-primary' onClick={props.next}>
            Next
          </button>
        </div>
    </div>
  )
}

function StepTwo(props) {
  return (
    <div>
      <h2>Dear user, we can't conect to your favorite HR platform </h2>
      <h2>So, we need to know your employee name's </h2>
      <Field name="Employee #1" component={renderField} type="text" label="Employee #1"/>
      <Field name="Employee #2" component={renderField} type="text" label="Employee #2"/>
      <div style={{marginTop: 20}}>
        <button className='btn' onClick={props.previous} style={{marginRight: 20}}>
          Previous
        </button>
        <button className='btn btn-primary' onClick={props.next}>
          Access Metaverso
        </button>
      </div>
    </div>
  )
}


class Form extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      step: 1
    }
    this.next = this.next.bind(this)
    this.previous = this.previous.bind(this)
  }
  redirect(e){
      e.preventDefault()
      window.location.replace('https://play.decentraland.org/')
  }
  next(e) {
    e.preventDefault()
    this.setState({ step: this.state.step + 1 })
  }
  previous(e) {
    e.preventDefault()
    this.setState({ step: this.state.step - 1 })
  }
  render() {
    const { handleSubmit } = this.props
    const {step} = this.state
    return (
      <Example title='The Place'>
        <form onSubmit={handleSubmit}>
          {step === 1 ? <StepOne {...this.props} next={this.next} /> : null}
          {step === 2 ? <StepTwo {...this.props} next={this.redirect} previous={this.previous} /> : null}
        </form>
      </Example>
    )
  }
}


export default reduxForm({
  form: 'multistep',
})(Form)


