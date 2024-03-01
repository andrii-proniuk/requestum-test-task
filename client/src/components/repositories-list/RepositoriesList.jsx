import React from "react";

import './RepositoriesList.css';

class RepositoriesList extends React.Component {
  constructor(props) {
    super(props);

    this.list = props.list;

    console.log(this.list);
  }

  render() {
    return (
      Array.isArray(this.list) && this.list.length
        ?
          <ul className="repositories-list">
            {
              this.list.map((repository) => {
                return (
                  <li className="repository-item" key={ repository.name }>
                    <a target="_blank" rel="noreferrer" href={ repository.url }>
                      <p className="repository-item-name">{ repository.name }</p>
                      <p className="repository-item-contributors-count">
                        { repository.contributorsCount + ' similar contributors' }
                      </p>
                    </a>
                  </li>
                );
              })
            }
          </ul>
        :
          <></>
    );
  }
}

export default RepositoriesList;
