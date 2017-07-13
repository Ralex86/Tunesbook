import React,{Component} from 'react'
import styles from './../css/search.css'

export default class Search extends Component {
    constructor(props){
        super(props)

        this.handleChange = this.handleChange.bind(this)
        this.filteredTunes = this.filteredTunes.bind(this)
    
    }

    filteredTunes(tunes, substring){
        return tunes.filter(value => value["T"].toLowerCase().indexOf(substring.toLowerCase()) !== -1)
    }

    handleChange(e){
        let tunes = this.props.tunes
        let substring = e.target.value
        let filtered_tunes = this.filteredTunes(tunes,substring)
        this.props.updateTuneList(filtered_tunes)
    }

    render(){
        return(
            <div className={styles.header}>
                <div className={styles.search}>
                    <input placeholder="Search a reel..." autoComplete="off" autoCapitalize="off" autoCorrect="off" spellCheck="false" type="text" onChange={this.handleChange}/>
                </div>
            </div>   
        )
    }
}
