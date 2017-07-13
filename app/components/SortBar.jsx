import React,{Component} from 'react'
import styles from './../css/sortbar.css'

export default class SortBar extends Component {
    constructor(props){
        super(props)

        this.handleSortId = this.handleSortId.bind(this)
        this.handleSortName = this.handleSortName.bind(this)
        this.handleSortKey = this.handleSortKey.bind(this)
    }

    handleSortId(){
        this.props.sortById()
    }
    
    handleSortName(){
        this.props.sortByName()
    }

    handleSortKey(){
        this.props.sortByKey()
    }

    render(){
        return(

            <div className={styles.header_bar}>
                <div style={this.props.by === "id" ?  {color: '#398df0' ,width: '33px'} : {width: '33px'} } onClick={this.handleSortId}>
                    id
                </div>
                <div style={this.props.by === "name" ?  {color: '#398df0' ,flex: 1, maxWidth: '300px'} : {flex: 1, maxWidth: '300px'} } onClick={this.handleSortName}>
                    Title
                </div>
                <div style={this.props.by === "key" ?  {color: '#398df0' ,width: '33px', alignSelf: 'flexEnd'} : {width: '33px', alignSelf: 'flexEnd'} } onClick={this.handleSortKey} >
                    Key
                </div>
            </div>    
        )
    }
}
