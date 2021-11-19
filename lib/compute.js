const { simhash, similarity } = require( '@biu/simhash' )

// 同维度的因子使用相同权重计算
function calcHash( factors = [] ) {
  return simhash(
    factors.map( factor => {
      return {
        text: String( factor ),
        weight: 1,
      }
    } )
  )
}

function computeSimilarity( signA, signB ) {
  const { total, weights } = Object.keys( signA )
    .map( key => {
      const factorsA = signA[ key ]
      const factorsB = signB[ key ]

      const factorLen = ( factorsA.length + factorsB.length ) / 2

      const hashA = calcHash( factorsA )
      const hashB = calcHash( factorsB )

      return {
        value: similarity( hashA, hashB ),
        // 长度越长，结果可信度越高，提升权重
        weight: factorLen,
      }
    } )
    .reduce( ( memo, current ) => {
      memo.total = memo.total + ( current.value * current.weight )
      memo.weights = memo.weights + current.weight
      return memo
    }, {
      total: 0,
      weights: 0,
    } )

  return total / weights
}

module.exports = computeSimilarity
