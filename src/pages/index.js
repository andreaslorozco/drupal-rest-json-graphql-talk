import React, { Component } from "react"

import Layout from "../components/layout"

import "./index.css"

class IndexPage extends Component {
  state = {
    name: "",
    message: "",
    signatures: [],
    dataLoaded: false,
  }

  componentDidMount = () => {
    this.loadMessages()
  }

  loadMessages = async () => {
    try {
      const data = await fetch(
        "https://dev-dc2019-rest-jsonapi-graphql.pantheonsite.io/signatures",
        {
          method: "GET",
          headers: {
            Accept: "application/vnd.api+json",
          },
        }
      )
      const response = await data.json()
      this.setState({
        signatures: response,
        dataLoaded: true,
      })
    } catch (error) {
      console.error(error)
    }
  }

  handleNameChange = e => {
    this.setState({
      name: e.target.value,
    })
  }

  handleMessageChange = e => {
    this.setState({
      message: e.target.value,
    })
  }

  renderSignatures = () => {
    return this.state.signatures.map((signature, i) => {
      return (
        <li key={i}>
          <span className="sig-name">{signature.by}: </span> {signature.message}{" "}
          -{" "}
          <span className="posted-through">
            Posteado desde <span>{signature.posted_through}</span>
          </span>
        </li>
      )
    })
  }

  isAnyFieldEmpty = () => {
    if (this.state.name.length === 0 || this.state.message.length === 0) {
      console.log("a value is empty")
      return true
    }
    return false
  }

  handleSubmitRestApi = async () => {
    const body = {
      _links: {
        type: {
          href:
            "http://dev-dc2019-rest-jsonapi-graphql.pantheonsite.io/rest/type/node/signature",
        },
      },
      type: [
        {
          target_id: "signature",
        },
      ],
      title: [
        {
          value: `${this.state.name}`,
        },
      ],
      field_message: [
        {
          value: `${this.state.message}`,
        },
      ],
      field_posted_through: [
        {
          value: "REST API",
        },
      ],
    }
    const stringifiedBody = JSON.stringify(body)
    try {
      const data = await fetch(
        "http://dev-dc2019-rest-jsonapi-graphql.pantheonsite.io/node?_format=hal_json",
        {
          method: "POST",
          headers: {
            Accept: "application/hal+json",
            "Content-Type": "application/hal+json",
            Authorization:
              "Basic RHVtbXlBY2NvdW50OjRyWVFiaVhTTmtaM0NudkdhSkZSNnBibg==",
          },
          body: stringifiedBody,
        }
      )
      const response = await data.json()
      console.log(response)
      this.setState(
        {
          message: "",
        },
        this.loadMessages
      )
    } catch (error) {
      console.error(error)
    }
  }

  handleSubmitJsonApi = async () => {
    try {
      const data = await fetch(
        "https://dev-dc2019-rest-jsonapi-graphql.pantheonsite.io/jsonapi/node/signature",
        {
          method: "POST",
          headers: {
            Accept: "application/vnd.api+json",
            "Content-Type": "application/vnd.api+json",
            Authorization:
              "Basic RHVtbXlBY2NvdW50OjRyWVFiaVhTTmtaM0NudkdhSkZSNnBibg==",
          },
          body: JSON.stringify({
            data: {
              type: "node--signature",
              attributes: {
                title: `${this.state.name}`,
                field_message: `${this.state.message}`,
                field_posted_through: "JSON API",
              },
            },
          }),
        }
      )
      await data.json()
      this.setState(
        {
          message: "",
        },
        this.loadMessages
      )
    } catch (error) {
      console.error(error)
    }
  }

  handleSubmitGraphQl = async () => {
    const query = JSON.stringify({
      query: `
        mutation {
          createSignature(input: {title: "${this.state.name}" field_message: "${this.state.message}" field_posted_through: "Graph QL!"}) {
            entity {
              entityId
            }
            errors
            violations {
              path
              message
            }
          }
        }
      `,
    })

    try {
      const data = await fetch(
        "https://dev-dc2019-rest-jsonapi-graphql.pantheonsite.io/graphql",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization:
              "Basic RHVtbXlBY2NvdW50OjRyWVFiaVhTTmtaM0NudkdhSkZSNnBibg==",
          },
          body: query,
        }
      )
      const response = await data.json()
      console.log(response)
      this.setState(
        {
          message: "",
        },
        this.loadMessages
      )
    } catch (error) {
      console.error("error!!!", error)
    }
  }

  render() {
    const disabled = this.isAnyFieldEmpty()
    return (
      <Layout>
        <div className="container">
          <input
            type="text"
            id="name"
            name="name"
            required
            minLength="4"
            maxLength="8"
            size="10"
            placeholder="Tu firma :)"
            onChange={this.handleNameChange}
            className="form-field"
            value={this.state.name}
          ></input>
          <textarea
            id="message"
            name="message"
            rows="5"
            cols="33"
            placeholder="Tu mensaje"
            onChange={this.handleMessageChange}
            className="form-field"
            value={this.state.message}
            required
          ></textarea>
          <div id="button-container">
            <button
              className="submit button"
              type="button"
              onClick={this.handleSubmitGraphQl}
              disabled={disabled}
            >
              Firma con GRAPHQL
            </button>
            <button
              className="submit button"
              type="button"
              onClick={this.handleSubmitJsonApi}
              disabled={disabled}
            >
              Firma con JSON:API
            </button>
            <button
              className="submit button"
              type="button"
              onClick={this.handleSubmitRestApi}
              disabled={disabled}
            >
              Firma con REST API
            </button>
          </div>
          {this.state.dataLoaded ? (
            <div id="signatures" className="form-field">
              <h3 className="recent-title">Firmas recientes</h3>
              <ul>{this.renderSignatures()}</ul>
            </div>
          ) : null}
        </div>
      </Layout>
    )
  }
}

export default IndexPage
