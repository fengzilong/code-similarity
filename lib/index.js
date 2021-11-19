/* eslint-disable no-magic-numbers */
const memoize = require( 'fast-memoize' )
const getSignature = require( 'code-signature' )
const computeSimilarity = require( './compute' )

module.exports = memoize( function getSimilarity( codeA = '', codeB = '' ) {
  const signatureA = getSignature( codeA )
  const signatureB = getSignature( codeB )

  return {
    score: computeSimilarity( signatureA, signatureB ),
    signatures: [
      signatureA,
      signatureB,
    ]
  }
} )
