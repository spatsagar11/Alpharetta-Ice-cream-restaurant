import React, { Component } from 'react';
import { connect } from 'react-redux';
import { LIST_STATUS } from './store/reducer.js';
import { fetchRestaruants } from './store/actions.js';

class RestaurantList extends Component {
    componentDidMount() {
        this.props.dispatch(fetchRestaruants());
    }
    render() {
        const {
            listStatus,
            items
        } = this.props;
        console.log(items)
        if (listStatus === LIST_STATUS.INITIAL || listStatus === LIST_STATUS.FETCHING) {
            return <div className="incenter">
                Please wait loading data...
        </div>
        } else if (items.length === 0) {
            return <div className="incenter">
                No result found
        </div >
        }
        return <React.Fragment>
            <div className="resultHeader">
                <h2>Name</h2>
                <h2>Address</h2>
                <h2>Review</h2>
            </div>
            <div className="results">
                {items.map(item => <div className="resultElement" key={item.id}>
                    <h3>{item.name}</h3>
                    <h3>{item.address}</h3>
                    <div>
                        <h3>
                            {item.review.user}
                        </h3>
                        <span>{item.review.text}</span>
                    </div>
                </div>)}
            </div>
        </React.Fragment>
    }
}

const mapStateToProps = ({ restaurant }) => ({
    listStatus: restaurant.listStatus,
    items: restaurant.items
});

export default connect(mapStateToProps)(RestaurantList)