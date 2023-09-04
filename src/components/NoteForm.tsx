import { FormEvent, useRef, useState } from "react";
import { Form, Stack, Row, Col, Button } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import CreatableReactSelect from "react-select/creatable";
import { NoteData, Tag } from "../App";
import { v4 as uuidv4 } from "uuid";


type NoteFormProps = {
  availableTags: Tag[];
  onSubmit: (data: NoteData) => void;
  onAddTag: (tag: Tag) => void;
} & Partial<NoteData>

function NoteForm({ onSubmit, onAddTag, availableTags, title="", markdown="", tags=[] }: NoteFormProps) {
  const titleRef = useRef<HTMLInputElement>(null);
  const markDownRef = useRef<HTMLTextAreaElement>(null);
  const [selectedTags, setSelectedTags] = useState<Tag[]>(tags);
  const navigate = useNavigate();

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    onSubmit({
      title: titleRef.current!.value,
      markdown: markDownRef.current!.value,
      tags: selectedTags,
    });
    navigate("..");
  };

  return (
    <>
      <Form onSubmit={handleSubmit}>
        <Stack gap={3}>
          <Row>
            <Col>
              <Form.Group controlId="title">
                <Form.Label>title</Form.Label>
                <Form.Control ref={titleRef} required defaultValue={title}/>
              </Form.Group>
            </Col>
            <Col>
              <Form.Group controlId="tags">
                <Form.Label>Tags</Form.Label>
                <CreatableReactSelect
                  onCreateOption={(label) => {
                    const newTag = { id: uuidv4(), label };
                    onAddTag(newTag);
                    setSelectedTags(prev => [...prev, newTag])
                  }}
                  value={selectedTags?.map((tag) => {
                    return { label: tag.label, value: tag.id };
                  })}
                  options={availableTags.map((tag) => {
                    return { label: tag.label, value: tag.id };
                  })}
                  onChange={(tags) => {
                    setSelectedTags(
                      tags.map((tag) => {
                        return { label: tag.label, id: tag.value };
                      })
                    );
                  }}
                  isMulti
                />
              </Form.Group>
            </Col>
          </Row>
          <Form.Group controlId="markdown">
            <Form.Label>Body</Form.Label>
            <Form.Control defaultValue={markdown} ref={markDownRef} required as="textarea" rows={15} />
          </Form.Group>
          <Stack direction="horizontal" gap={3} className="justify-content-end">
            <Button type="submit">Save</Button>
            <Link to="..">
              <Button type="button" variant="outline-secondary">
                Cancel
              </Button>
            </Link>
          </Stack>
        </Stack>
      </Form>
    </>
  );
}

export default NoteForm;