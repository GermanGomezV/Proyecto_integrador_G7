import React from 'react';
import ContentRowTop from './ContentRowTop'
import Products from './Products'
import Footer from './Footer'
	
function ContentWrapper () {
    return (    
		<div id="content-wrapper" className="d-flex flex-column">
			<div id="content">
                <br/>
                <ContentRowTop />
                <Products />
                <Footer />
            </div>

        </div>
    )
}

export default ContentWrapper