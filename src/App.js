import React from "react";
import "./styles.css";

class App extends React.Component {
  state = {
    noteList: [],
    notesObj: {
      name: "",
      status: ""
    },
    displayData: [],
    currentButton: "all"
  };

  onNameChange = (e, name) => {
    let ch = e.target.value;
    switch (name) {
      case "name":
        this.setState(prevState => ({
          notesObj: {
            ...prevState.notesObj,
            name: ch
          }
        }));
        break;
      case "status":
        this.setState(prevState => ({
          notesObj: {
            ...prevState.notesObj,
            status: ch
          }
        }));
        break;
      default:
        break;
    }
  };
  addNote = event => {
    const { notesObj } = this.state;

    if (notesObj.name === "" || notesObj.status === "") {
      return;
    } else {
      let arr = notesObj;
      this.setState(
        prevState => ({
          noteList: [...prevState.noteList, arr],
          notesObj: {
            ...prevState.notesObj,
            name: "",
            status: ""
          }
        }),
        () => {
          this.filterData(this.state.currentButton);
        }
      );
    }
  };

  filterData = name => {
    const { noteList } = this.state;
    // console.log(displayData)
    let dp = [];
    switch (name) {
      case "all":
        let active = [],
          completed = [],
          others = [];
        noteList.forEach(item => {
          if (item.status.toLowerCase() === "active") active.push(item);
          else if (item.status.toLowerCase() === "completed")
            completed.push(item);
          else others.push(item);
        });
        dp = active.concat(completed.concat(others));
        break;

      case "active":
        let active1 = [];
        noteList.forEach(item => {
          if (item.status.toLowerCase() === "active") active1.push(item);
        });
        dp = active1;
        break;
      case "completed":
        let completed1 = [];
        noteList.forEach(item => {
          if (item.status.toLowerCase() === "completed") completed1.push(item);
        });
        dp = completed1;
        break;
      default:
        break;
    }
    this.setState({
      ...this.state,
      displayData: dp,
      currentButton: name
    });
  };
  render() {
    return (
      <div className="mainBody">
        <div>
          <input
            className="input"
            data-testid="input-note-name"
            type="text"
            id="name"
            name="name"
            onChange={(e, name) => {
              this.onNameChange(e, "name");
            }}
            value={this.state.notesObj.name}
          />
          <input
            className="input"
            type="text"
            data-testid="input-note-status"
            id="status"
            name="status"
            onChange={(e, status) => {
              this.onNameChange(e, "status");
            }}
            value={this.state.notesObj.status}
          />
          <button
            className="button"
            onClick={e => {
              this.addNote(e);
            }}
            data-testid="submit-button"
          >
            Add Note{" "}
          </button>
        </div>
        <br />
        <div>
          <button
            onClick={() => {
              this.filterData("all");
            }}
            data-testid="allButton"
          >
            All
          </button>
          <button
            onClick={() => {
              this.filterData("active");
            }}
            data-testid="activeButton"
          >
            Active{" "}
          </button>
          <button
            onClick={() => {
              this.filterData("completed");
            }}
            data-testid="completedButton"
          >
            completed
          </button>
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody data-testid="noteList">
              {this.state.displayData.map((item, index) => (
                <tr key={index}>
                  <td>{item.name}</td>
                  <td>{item.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}
export default App;
