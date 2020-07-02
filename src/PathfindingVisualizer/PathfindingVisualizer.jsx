import React,{Component} from 'react';
import Node from './Node/Node';
import './PathfindingVisualizer.css';


export default class PathfindingVisualizer extends Component {
    constructor(props){
        super(props);
        this.state = {
            nodes:[],
        };
    }

    componentDidMount(){
        const nodes=[];
        for(let row=0;row<15;row++){
            const CurrentRow=[];
            for(let col=0;col<50;col++){
                const currentNode = {
                    col,
                    row,
                    isStart:row === 10 && col === 5,
                    isFinish: row === 10 && col === 45,
                };
                CurrentRow.push(currentNode);
            }
            nodes.push(CurrentRow);
        }
        this.setState({nodes})
    }
    render() {
        const {nodes} = this.state;
        console.log(nodes)

        return(
            <div className="grid">
                {nodes.map((row,rowIdx)=>{
                    return (
                        <div key={rowIdx}>
                            {row.map((node,nodeIdx)=>{
                                return <Node key={nodeIdx} isStart={true} test={'foo'} test={'kappa'}></Node>
                            }
                        )}
                        </div>
                    );
                })}
            </div>
        );
    }
}