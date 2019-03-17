import React from 'react'
import Layout from '../components/Layout'
import { Link } from "gatsby";

const NotFoundPage = () => (
  <Layout>
	  <div className="container content">
	    <div className="columns">
	      <div className="column is-12">
	  		<h1>Sivua ei löydy</h1>
	  		<Link to="/tekstit">
        		<div className="button">
        			&larr; Palaa etusivulle
        		</div>
          	</Link>
	  	  </div>
	  	</div>
	  </div>
  </Layout>
)

export default NotFoundPage
