import { Navigate, Outlet, useOutletContext, useParams } from "react-router-dom";
import { Note } from "../App";

type NoteLayoutProps = {
    notes: Note[]
}
function NoteLayout({notes}: NoteLayoutProps) {
    const {id} = useParams();
    const note = notes.find(n => n.id === id);

    if (note == null) return <Navigate to="/" replace />
    return <Outlet context={note} /> //This will return whatever is inside of this component, that is what is inside of <Route> in App
};

export default NoteLayout;

export function useNote() {
    return useOutletContext<Note>()
}