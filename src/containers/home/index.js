import React, {Component} from 'react'
import Pagination from 'react-bootstrap/lib/Pagination';
import api from '../../api';
import '../../style/css/home.css'

class Home extends Component {

	constructor(props) {
        super(props);
        this.state = {
            story: {
                id: 0,
                name: '',
                address: '',
                phoneNumber: '',
				city: '',
            },
            stories: [],      
            current: 1,
            limit: 10,
            totalElements : 0,
            totalPages : 0
        };
        this.loadStory();
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevState.current !== this.state.current) {
            this.loadStory();
        }
    }


    loadStory = () => {
        let self = this;
        api.get('/v1/stores', { params: {limit : self.state.limit, page : self.state.current, perPage:self.state.limit }})
            .then(function (response) {
                console.log("data ",response.data);
                self.setState({stories: []});	
                self.setState({stories: self.state.stories.concat(Object(response.data.results))});
                //self.setState({current: response.data.number});
                self.setState({totalPages: response.data.total/10});
                self.setState({totalElements: response.data.total});
				
            })
            .catch(function (error) {
                console.log("stories error response :: ", error);
            });


    };


    onPaginationChange(current){
        console.log("current ",current);
        this.setState({
            current: current,
        });

    };

    paginationPrev() {
        const {current} = this.state;
        console.log("current prev", current)
        if (current > 1 )
            this.setState({
                current: current - 1,
            });
    }

    paginationNext(){
        const {current, totalPages} = this.state;
        console.log("current next", current)
        if(current < totalPages)
            this.setState({
                current: current + 1,
            });
    }

    render() {
        const {stories, story, current, totalPages, totalElements} = this.state;
        console.log("render current ", current);
        let storyItem_left = [];
        let storyItem_right = [];
        if(current + 2 < totalPages)
        {
            for (let number = current; number <= current + 2; number++) {
                storyItem_left.push(
                    <Pagination.Item active={number === current} onClick={() => this.onPaginationChange(number)}>{number}</Pagination.Item>
                );
            }
            
            for (let number = totalPages-1; number <= totalPages; number++) {
                storyItem_right.push(
                    <Pagination.Item active={number === current} onClick={() => this.onPaginationChange(number)}>{number}</Pagination.Item>
                );
            }
        }
        if(current > totalPages - 3)
        {
            for (let number = totalPages-2; number <= totalPages; number++) {
                storyItem_right.push(
                    <Pagination.Item active={number === current} onClick={() => this.onPaginationChange(number)}>{number}</Pagination.Item>
                );
            }
        }
        let storiesComponent = stories.map((story) =>  
            <tr>
                <td>{story.id}</td>
                <td>{story.name}</td>
                <td>{story.address}</td> 
                <td>{story.phoneNumber}</td> 
                <td>{story.city}</td> 
            </tr>
           
        );

        return (
            <div>
                <div className="container">
                    <div className="starter-template">
                        <div className="row">
                            <div className="col-md-2">
                                <div className="story-header">
                                    <h2><strong>Story Page</strong></h2>
                                </div>
                            </div>
                            <div className="col-md-12">
                                <table id="users">
                                    <thead>
                                        <tr>
                                            <th>ID</th>
                                            <th>Name</th>
                                            <th>Address</th>
                                            <th>Phone</th>
                                            <th>City</th>
                                        </tr>
                                    </thead>
                                    <tbody>{storiesComponent}</tbody>
                                </table>
                                <div className="pagination-div">
                                    <span>Total Stories: {totalElements}</span><br/>
                                    <Pagination bsSize="medium">
                                        <Pagination.Prev onClick={() => this.paginationPrev()}/>
                                        {storyItem_left}
                                        <Pagination.Ellipsis />
                                        {storyItem_right}
                                        <Pagination.Next onClick={() => this.paginationNext()} />
                                    </Pagination>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                
                
            </div>
        )
    }
}

export default Home;