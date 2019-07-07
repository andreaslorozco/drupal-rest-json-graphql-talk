import React, { Component } from "react"

import Layout from "../components/layout"

import "./index.css";


class IndexPage extends Component {
  state = {
    signatures: [],
  }

  componentDidMount = async () => {
    const data = await fetch("https://dev-dc2019-rest-jsonapi-graphql.pantheonsite.io/signatures", {
      method: "GET",
      headers: {
        Accept: "application/vnd.api+json"
      }
    });
    const response = await data.json();
    this.setState({
      signatures: response,
    })
  }

  renderSignatures = () => {
    return this.state.signatures.map(signature => {
      return (<li><span class="sig-name">{signature.by}: </span> {signature.message} - <span class="posted-through">Posteado desde <span>{signature.posted_through}</span></span></li>)
    })
  }


  render() {
    console.log("STATE!!",this.state);
    return (
      <Layout>
      <div className="container">
        <input type="text" id="name" name="name" required
            minLength="4" maxLength="8" size="10" placeholder="Tu firma :)"></input>
        <textarea id="story" name="story" rows="5" cols="33" placeholder="Tu mensaje">
        </textarea>
        <div id="button-container">
          <button className="submit" type="button">
            POST por GRAPHQL
          </button>
          <button className="submit" type="button">
            POST por JSON:API
          </button>
          <button className="submit" type="button">
            POST por REST API
          </button>
        </div>
        <div id="signatures">
          <ul>
            {this.renderSignatures()}
          </ul>
        </div>
      </div>
    </Layout>
    )
  }
}

export default IndexPage
