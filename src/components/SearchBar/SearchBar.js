import React, { Component } from 'react';
import './SearchBar.css';

class SearchBar extends Component {
	constructor(props) {
		super(props);
		this.state = {
			term: '',
			location: '',
			sortBy: 'best_match',
		};
		this.sortByOptions = {
			'Best Match': 'best_match',
			'Highest Rated': 'rating',
			'Most Reviewed': 'review_count',
		};

		// method binds
		this.handleTermChange = this.handleTermChange.bind(this);
		this.handlelocationChange = this.handlelocationChange.bind(this);
		this.handleSearch = this.handleSearch.bind(this);
	}

	// return the css class for sorting option
	getSortByClass(sortByOption) {
		if (this.state.sortBy === sortByOption) {
			return 'active';
		} else {
			return '';
		}
	}

	// creates search options list
	renderSortByOptions() {
		return Object.keys(this.sortByOptions).map((sortByOption) => {
			let sortByOptionValue = this.sortByOptions[sortByOption];
			return (
				<li
					key={sortByOptionValue}
					className={this.getSortByClass(sortByOptionValue)}
					onClick={this.handleSortByChange.bind(this, sortByOptionValue)}>
					{sortByOption}
				</li>
			);
		});
	}

	// handle change functions
	handleSortByChange(sortByOption) {
		this.setState({
			sortBy: sortByOption,
		});
	}

	handleTermChange(e) {
		this.setState({
			term: e.target.value,
		});
	}

	handlelocationChange(e) {
		this.setState({
			location: e.target.value,
		});
	}

	handleSearch(e) {
		const { term, location, sortBy } = this.state;

		if (term && location && sortBy)
			this.props.searchYelp(term, location, sortBy);
	}

	render() {
		return (
			<div className='SearchBar'>
				<div className='SearchBar-sort-options'>
					<ul>{this.renderSortByOptions()}</ul>
				</div>
				<div className='SearchBar-fields'>
					<input
						placeholder='Search Businesses'
						onChange={this.handleTermChange}
					/>
					<input placeholder='Where?' onChange={this.handlelocationChange} />
				</div>
				<div className='SearchBar-submit'>
					<button onClick={this.handleSearch}>Let's Go</button>
				</div>
			</div>
		);
	}
}

export default SearchBar;
