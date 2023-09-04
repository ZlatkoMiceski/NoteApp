import { NoteData, Tag } from "../App";
import NoteForm from "../components/NoteForm";

type NewNoteProps = {
  availableTags: Tag[]
  onSubmit: (data: NoteData) => void
  onAddTag: (tag: Tag) => void
}

function NewNote({ availableTags, onSubmit, onAddTag }: NewNoteProps) {
  return (
    <>
      <h1 className="mb-4">New Note</h1>
      <NoteForm onSubmit={onSubmit} onAddTag={onAddTag} availableTags={availableTags}/>
    </>
  );
}

export default NewNote;
