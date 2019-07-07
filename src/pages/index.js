import React from "react"

import Layout from "../components/layout"

import "./index.css";

const IndexPage = () => (
  <Layout>
    <div className="container">
      <input type="text" id="name" name="name" required
          minlength="4" maxlength="8" size="10" placeholder="Tu firma :)"></input>
      <textarea id="story" name="story" rows="5" cols="33" placeholder="Tu mensaje">
      </textarea>
      <div id="button-container">
        <button class="submit" type="button">
          POST por GRAPHQL
        </button>
        <button class="submit" type="button">
          POST por JSON:API
        </button>
        <button class="submit" type="button">
          POST por REST API
        </button>
      </div>
      <div id="signatures">
        <ul>
          <li><span>Nombre: </span> Drupal</li>
          <li><span>Nombre: </span> Camp</li>
          <li><span>Nombre: </span> Costa Rica 2019</li>
        </ul>
      </div>
    </div>
  </Layout>
)

export default IndexPage
