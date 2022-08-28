'use strict'

const e = React.createElement;

class ErrorBoundary extends React.Component {
    constructor(props) {
        super(props)
        this.state = { hasError: false }
    }

    static getDerivedStateFromError(error) {
        // update state so the next render will show the fallback UI.
        console.log('here')
        return { hasError: true }
    }

    componentDidCatch(error, errorInfo) {
        // you can also log the error to an error reporting service
        console.log(error, errorInfo)
    }

    render() {
        if (this.state.hasError) {
            // You can render any custom fallback UI
            return <h1>Something went wrong.</h1>
        }

        return this.props.children
    }
}

function Bomb() {
    throw new Error("💥CABOOM💥")
}

function Form() {
    return (
        <form action="" method="post">
            <fieldset>
                <legend>Form</legend>
                <label htmlFor="name">Text</label>
                <input type="text"
                    autoComplete="true"
                    aria-label='Text'
                    aria-required='true'
                    name='name'
                    required
                />
                <button type="submit">Submit</button>
            </fieldset>
        </form>
    )
}

function Page() {
    return (
        <ErrorBoundary>
            <Form />
            {/* <Bomb/> */}
        </ErrorBoundary>
    )
}

const domContainer = document.querySelector('#dom_container')
const root = ReactDOM.createRoot(domContainer)
root.render(e(Page))