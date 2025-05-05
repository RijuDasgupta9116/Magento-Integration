import React from 'react';
import { useParams } from 'react-router-dom';
import { useQuery, gql } from '@apollo/client';

const GET_PRODUCT = gql`
  query GetProduct($sku: String!) {
    products(filter: { sku: { eq: $sku } }) {
      items {
        id
        name
        description {
          html
        }
        image {
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

export default function ProductDetail() {
  const { sku } = useParams();
  const { loading, error, data } = useQuery(GET_PRODUCT, {
    variables: { sku }
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const product = data.products.items[0];

  return (
    <div>
      <h1>{product.name}</h1>
      <img src={product.image?.url} alt={product.name} width="300" />
      <p dangerouslySetInnerHTML={{ __html: product.description?.html }} />
      <p>{product.price_range.minimum_price.regular_price.value} {product.price_range.minimum_price.regular_price.currency}</p>
    </div>
  );
}
