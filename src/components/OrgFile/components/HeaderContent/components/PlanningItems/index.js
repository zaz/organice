import React, { PureComponent } from 'react';

import './stylesheet.css';

import { renderAsText } from '../../../../../../lib/timestamps';
import { shouldRenderPlanningItem } from '../../../../../../lib/org_utils';

import _ from 'lodash';

export default class PlanningItems extends PureComponent {
  constructor(props) {
    super(props);

    _.bindAll(this, ['handleTimestampClick']);
  }

  handleTimestampClick(planningItemIndex) {
    return () => this.props.onClick(planningItemIndex);
  }

  render() {
    const { planningItems } = this.props;

    const planningItemsToRender = planningItems.filter((x) => shouldRenderPlanningItem(x.toJS()));
    if (planningItemsToRender.isEmpty()) return null;

    return (
      <div>
        {planningItemsToRender.map((planningItem, index) => (
          <div key={planningItem.get('id')} className="planning-items__item-container">
            <div className="planning-item__type">{planningItem.get('type')}: </div>
            <div className="planning-item__timestamp" onClick={this.handleTimestampClick(index)}>
              {renderAsText(planningItem.get('timestamp'))}
            </div>
          </div>
        ))}
      </div>
    );
  }
}
