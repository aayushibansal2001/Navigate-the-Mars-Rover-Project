import React,{Component} from 'react';
import './Node.css';

export default class Node extends Component{
    constructor(props){
        super(props);
        this.state={};
    }

    render() {
        const {isFinish,isStart}=this.props;
        const extractClassName = isFinish
            ? 'node-Finish'
            :isStart
            ? 'node-start'
            : '';
            
        return <div className={'node ${extraClassName}'}></div> /*i guess there is some error in this line*/
    }
}

export const DEFAULT_NODE={
    row:0,
    col:0,
};