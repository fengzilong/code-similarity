#!/usr/bin/env node

const fs = require( 'fs' )
const path = require( 'path' )
const getSimilarity = require( '../' )

const cwd = process.cwd()

const fileA = path.resolve( cwd, process.argv[ 2 ] || '' )
const fileB = path.resolve( cwd, process.argv[ 3 ] || '' )

try {
  const codeA = fs.readFileSync( fileA, 'utf8' )
  const codeB = fs.readFileSync( fileB, 'utf8' )

  const { score, signatures } = getSimilarity( codeA, codeB )

  console.log()
  console.log( 'Similarity:', score )
  console.log()
  console.log( fileA )
  console.log( signatures[ 0 ] )
  console.log()
  console.log( fileB )
  console.log( signatures[ 1 ] )
  console.log()
} catch ( e ) {
  console.log( e )
}
