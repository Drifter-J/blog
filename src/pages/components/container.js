import React from 'react'
import containerStyles from "./container.module.css" 
/* module.css로 확장자를 만들면,
plain css가 아니라 css module로 css 파일이 처리됨*/

export default ({children}) => (
    <div className={containerStyles.container}>{children}</div>
)