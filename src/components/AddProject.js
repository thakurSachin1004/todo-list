import React, { useState } from 'react'
import { firebase } from '../firebase';
import { generatePushId } from '../helpers';
import { useProjectValues } from '../context';

export const AddProject = ({ shouldShow = false }) => {
  const { projects, setProjects } = useProjectValues();
  const [show, setShow] = useState(shouldShow);
  const [projectName, setProjectName] = useState('');
  const projectId = generatePushId();

  const addProject = () => {
    projectName &&
      firebase
        .firestore()
        .collection('projects')
        .add({
          projectId,
          name: projectName,
          userId: '1',

        })
        .then(() => {
          setProjects([...projects]);
          setProjectName('');
          setShow(false);
        })
  }

  return (
    <div className="add-project" data-testid="add-project">
      {
        show && (
          <div className="add-project__input">
            <input
              value={projectName}
              onChange={e => setProjectName(e.target.value)}
              data-testid="project-name"
              placeholder="Project Name"
              className="add-project__input-elt"
            />
            <button className="add-project__submit"
              onClick={() => addProject()}
              data-testid="add-project__submit"
            >
              Add Project
            </button>
            <span data-testis="hide-project-overlay" role="button" className="add-project__cancel" onClick={() => setShow(false)}>
              Cancel
            </span>
          </div>
        )}
      <span className="add-project__plus">+</span>
      <span
        aria-label="Add Project"
        data-testid="add-project-action"
        className="add-project__text"
        onClick={() => setShow(!show)}
        onKeyDown={(e) => {
          if (e.key === 'Enter') setShow(!show);
        }}
        role="button"
        tabIndex={0}
      >
        Add Project
      </span>
    </div>
  )
}
