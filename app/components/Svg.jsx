import React,{Component} from 'react'

export default class Svg extends Component{
    constructor(props){
        super(props)
    }
    
    render(){
        return(
            <div dangerouslySetInnerHTML={{__html: this.props.svg}}>
            </div>    
        )
    }

}
