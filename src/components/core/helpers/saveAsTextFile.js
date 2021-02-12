function saveAsTextFile( content, filename ) {
    const a = document.createElement( 'a' );

    a.href = URL.createObjectURL( new Blob( [ content ], { type: "text/plain" } ) );
    a.setAttribute( 'download', filename );

    document.body.appendChild( a );
    a.click();
    document.body.removeChild( a );
}

export default saveAsTextFile;
export { saveAsTextFile };
