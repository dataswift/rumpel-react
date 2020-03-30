import {HatApplicationContent} from "@dataswift/hat-js/lib/interfaces/hat-application.interface";
import React from "react";
import Markdown from 'markdown-to-jsx';
import './UpdateNotes.scss';

type Props = {
    app: HatApplicationContent
}
export const UpdateNotes: React.FC<Props> = ({app}: Props) => {
    if (!app.info.updateNotes) return null;

    return (
        <div className="content-wrapper flex-column-wrapper">
            <section className="title-section">
                <div className="app-logo-wrapper">
                    <img src={app.info.graphics.logo.normal} className="app-logo" height="100" width="100" />
                </div>
                {app.kind.kind === 'App' &&
                <div className="app-rating-wrapper">
                    <div className="app-rating">
                        <span className="app-rating-highlighted">{app.info.rating.score}&nbsp;</span>
                    </div>
                </div>
                }


                <h3 className="title-section-heading">{app.info.name}</h3>
                <div className="title-section-text" ><Markdown>{app.info.updateNotes.header}</Markdown></div>
  </section>

  <section className="update-notes-section">
    <h4 className="section-header">Summary of updates</h4>
      {app.info.updateNotes.notes &&
      <ul className="app-update-notes">
          { app.info.updateNotes.notes.map((note, index) => {
              return (
                  <li className="app-update-notes-item" key={index}>
                      <div className="app-update-notes-item-content"><Markdown>{note}</Markdown></div>
                  </li>
              )
          })
          }
      </ul>
      }

  </section>
</div>
    )
};
