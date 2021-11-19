/* eslint-disable no-magic-numbers */
const memoize = require( 'fast-memoize' )
const getSignature = memoize(
  require( 'code-signature' ),
  { serializer: code => String( code ) }
)
const computeSimilarity = require( './compute' )

module.exports = memoize( function getSimilarity( codeA = '', codeB = '' ) {
  const signatureA = getSignature( codeA )
  const signatureB = getSignature( codeB )

  return {
    score: JSON.stringify( signatureA ) === JSON.stringify( signatureB ) ?
      1 :
      computeSimilarity( signatureA, signatureB ),
    signatures: [
      signatureA,
      signatureB,
    ]
  }
}, {
  serializer( a = '', b = '' ) {
    return `${ a }🌼${ b }`
  }
} )
