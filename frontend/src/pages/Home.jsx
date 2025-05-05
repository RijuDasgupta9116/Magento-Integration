import React from 'react';
import {useQuery, gql} from '@apollo/client';
import {Link} from 'react-router-dom';
import client from '../apollo/client';

const GET_PRODUCTS = gql`
{
  products(search: "") {
    items {
      id
      name
      sku
      url_key
      small_image {
        url
      }
      price_range {
        minimum_price {
          regular_price {
            value
            currency
          }
        }
      }
    }
  }
}
`;


const Home = () => {
    const {loading, error, data} = useQuery(GET_PRODUCTS);
    if(loading) return <p>Loading...</p>;
    if(error) return <p>Error: {error.message}</p>;
  return (
    <div>
      <h1>Products</h1>
      <div style={{display:'flex', flexWrap:'wrap'}}>
        {data.products.items.map(product=>(
            <div key={product.id} style={{ width: 200, margin: 10 }}>
            <Link to={`/product/${product.sku}`}>
              <img src={product.small_image?.url} alt={product.name} width="100%" />
              <h3>{product.name}</h3>
              <p>{product.price_range.minimum_price.regular_price.value} {product.price_range.minimum_price.regular_price.currency}</p>
            </Link>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Home
