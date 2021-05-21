import { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Navbar from "./navbar.component";

const Note = props => (
    <tr>
        <td>{(new Date(props.note.date)).toLocaleString().substring(0, (new Date(props.note.date)).toLocaleString().indexOf('/202'))}: <strong>{props.note.topic}</strong></td>
        <td><button className="btn btn-success" onClick={() => { props.complete(props.note._id) }}>Complete</button> | <Link to={"/admin/notes/edit/" + props.note._id}><button className="btn btn-primary">Edit</button></Link></td>
    </tr>
)

export default class NotesList extends Component {
    constructor(props) {
        super(props);
        this.complete = this.complete.bind(this);
        this.onChangeTopic = this.onChangeTopic.bind(this);
        this.onChangeDate = this.onChangeDate.bind(this);
        
        this.onChangePlan = this.onChangePlan.bind(this);
        this.onChangeofPlan = this.onChangeofPlan.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.allView = this.allView.bind(this);
        this.todayView = this.todayView.bind(this);
        this.weekView = this.weekView.bind(this);
        this.monthView = this.monthView.bind(this);
        this.recuringView = this.recuringView.bind(this);
        this.archiveView = this.archiveView.bind(this);

        this.state = {
            topic: '',
            date: new Date(),
            notes: [],
            view: "All",
            plan: "",
            planid: ""
        }

    }

    onChangeTopic(e) {
        this.setState({
            topic: e.target.value
        });
    }

    onChangeDate(date) {
        this.setState({
            date: date
        });
    }

    allView() {
        this.setState({
            view: "All"
        });
        axios.get("https://adits-notesapp.herokuapp.com/admin/notes/")
            .then(response => {
                this.setState({ notes: response.data });
            })
            .catch((error) => {
                console.log(error);
            });
    }


    todayView() {
        this.setState({
            view: "Today"
        });
        axios.get("https://adits-notesapp.herokuapp.com/admin/notes/day/")
            .then(response => {
                this.setState({ notes: response.data });
            })
            .catch((error) => {
                console.log(error);
            });
    }


    weekView() {
        this.setState({
            view: "Week"
        });
        axios.get("https://adits-notesapp.herokuapp.com/admin/notes/week/")
            .then(response => {
                this.setState({ notes: response.data });
            })
            .catch((error) => {
                console.log(error);
            });
    }


    monthView() {
        this.setState({
            view: "Month"
        });
        axios.get("https://adits-notesapp.herokuapp.com/admin/notes/month/")
            .then(response => {
                this.setState({ notes: response.data });
            })
            .catch((error) => {
                console.log(error);
            });
    }

    recuringView() {
        this.setState({
            view: "Recuring"
        });
        axios.get("https://adits-notesapp.herokuapp.com/admin/notes/recuring")
            .then(response => {
                this.setState({ notes: response.data });
            })
            .catch((error) => {
                console.log(error);
            });
    }

    archiveView() {
        this.setState({
            view: "Archive"
        });
        axios.get("https://adits-notesapp.herokuapp.com/admin/notes/archive")
            .then(response => {
                this.setState({ notes: response.data });
            })
            .catch((error) => {
                console.log(error);
            });
    }

    componentDidMount(){
        this.todayView();
        axios.get("https://adits-notesapp.herokuapp.com/admin/notes/plan")
            .then(response => {
                this.setState({ plan: response.data.topic, planid: response.data._id });
            })
            .catch((error) => {
                console.log(error);
            });
    }

    complete(id) {
        axios.post("https://adits-notesapp.herokuapp.com/admin/notes/complete/" + id, { complete: true })
            .then(res => setTimeout(() => { 
                console.log(res.data); 
                if(this.state.view === "All")
                    this.allView();
                else if (this.state.view === "Today")
                    this.todayView();
                else if (this.state.view === "Week")
                    this.weekView();
                else if (this.state.view === "Month")
                    this.monthView();    
                else if(this.state.view === "Recuring")
                    this.recuringView();
                else if(this.state.view === "Archive")
                    this.archiveView();
            }, 250));
    }

    onChangePlan(e){
        this.setState({
            plan: e.target.value
        });    
    }

    onChangeofPlan(e){
        e.preventDefault();
        const note = {
            topic: this.state.plan,
            date: this.state.date,
            complete: false,
            display: true
        };
        axios.post("https://adits-notesapp.herokuapp.com/admin/notes/update/" + this.state.planid, note)
            .then(res => setTimeout(() => { 
                console.log(res.data); 
                if(this.state.view === "All")
                    this.allView();
                else if (this.state.view === "Today")
                    this.todayView();
                else if (this.state.view === "Week")
                    this.weekView();
                else if (this.state.view === "Month")
                    this.monthView();    
                else if(this.state.view === "Recuring")
                    this.recuringView();
                else if(this.state.view === "Archive")
                    this.archiveView();
             }, 250));
    }

    onSubmit(e) {
        e.preventDefault();
        const note = {
            topic: this.state.topic,
            date: this.state.date,
        }

        axios.post("https://adits-notesapp.herokuapp.com/admin/notes/add", note)
            .then(res => setTimeout(() => { 
                console.log(res.data); 
            
                if(this.state.view === "All")
                    this.allView();
                else if (this.state.view === "Today")
                    this.todayView();
                else if (this.state.view === "Week")
                    this.weekView();
                else if (this.state.view === "Month")
                    this.monthView();    
                else if(this.state.view === "Recuring")
                    this.recuringView();
                else if(this.state.view === "Archive")
                    this.archiveView();}
                , 250));
            this.setState({
                    topic: '',
                    date: new Date()
                });
    }

    notesList() {
        return this.state.notes.map(currentnote => {
            return <Note note={currentnote} complete={this.complete} key={currentnote._id} />
        });
    }

    render() {
        return (
            <div className="container-fluid">
                <Navbar />
                <table className="table table-responsive">
                    <thead>
                        <tr>
                            <td><h3> To Do List: {this.state.view} View</h3> </td>
                        </tr>
                        <tr> 
                        <td>
                            <h5 >{this.state.plan}</h5>
                        </td>
                            <td className="input-group">
                                <input
                                    type="text"
                                    value={this.state.plan}
                                    onChange={this.onChangePlan}
                                />
                            </td>
                            
                        
                            <td>
                                <input
                                    type="submit"
                                    value="Update"
                                    className="btn btn-success"
                                    onClick={this.onChangeofPlan}
                                />
                            </td>

                        </tr>
                        <tr>
                            <td>
                                <button type="button" className="btn btn-light" onClick={this.allView}>All</button>
                                <button type="button" className="btn btn-secondary" onClick={this.todayView}>Today</button>
                                <button type="button" className="btn btn-dark" onClick={this.weekView}>Week</button>
                                <button type="button" className="btn btn-warning" onClick={this.monthView}>Month</button>
                                <button type="button" className="btn btn-info" onClick={this.recuringView}>Recuring</button>
                                <button type="button" className="btn btn-danger" onClick={this.archiveView}>Archive</button>
                            </td>
                        </tr>
                    </thead>
                </table>

                <table className="table table-sm table-responsive-sm table-hover ">
                    <thead className="thead-light">
                    
                        <tr>
                            <th> Topic </th>
                            <th > Action </th>
                            {/* <th > Actions </th> */}
                        </tr>
                        
                    </thead>
                    <tbody>
                    {this.notesList()}
                   
                        <tr> 
                            <td>
                                <DatePicker //npm install react-datepicker
                                    selected={this.state.date}
                                    onChange={this.onChangeDate}
                                />
                                <input
                                    type="text"
                                    value={this.state.topic}
                                    onChange={this.onChangeTopic}

                                />
                            </td>
                            
                        
                            <td>
                                <input
                                    type="submit"
                                    value="Create"
                                    className="btn btn-success"
                                    onClick={this.onSubmit}
                                />
                            </td>

                        </tr>
                    </tbody>
                </table>

            </div>
        )
    }
}