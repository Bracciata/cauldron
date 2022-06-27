import React from 'react';
import classnames from 'classnames';
import ExpandCollapsePanel, {
  ExpandCollapsePanelProps,
  PanelTrigger
} from '../ExpandCollapsePanel';
import { useId } from 'react-id-generator';

export interface AccordionTriggerProps
  extends React.HTMLAttributes<HTMLButtonElement> {
  children: React.ReactElement;
}

const AccordionTrigger = ({ children }: AccordionTriggerProps) => {
  return <>{children}</>;
};

interface AccordionContentProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode | React.ReactNode[];
}

const AccordionContent = ({ children }: AccordionContentProps) => {
  return <>{children}</>;
};

interface AccordionProps extends ExpandCollapsePanelProps {
  children: React.ReactNode;
}

const Accordion = ({ children, ...otherProps }: AccordionProps) => {
  const childrenArray = React.Children.toArray(children);
  const trigger = childrenArray.find(
    child => (child as React.ReactElement<any>).type === AccordionTrigger
  );
  const panelElement = childrenArray.find(
    child => (child as React.ReactElement<any>).type === AccordionContent
  );
  const elementId = useId();
  const isValid = !!(
    React.isValidElement(trigger) && React.isValidElement(panelElement)
  );

  if (!isValid) {
    return null;
  }

  return (
    <div className="Accordion">
      <ExpandCollapsePanel
        id={panelElement.props.id || `${elementId}-panel`}
        className={classnames('Accordion__panel', panelElement.props.className)}
        {...otherProps}
      >
        <PanelTrigger
          iconCollapsed="triangle-right"
          iconExpanded="triangle-down"
          className={classnames('Accordion__trigger', trigger.props.className)}
          aria-controls={panelElement.props.id || `${elementId}-panel`}
          {...trigger.props.otherProps}
        >
          {trigger}
        </PanelTrigger>
        {panelElement}
      </ExpandCollapsePanel>
    </div>
  );
};

Accordion.displayName = 'Accordion';
AccordionTrigger.displayName = 'AccordionTrigger';
AccordionContent.displayName = 'AccordionContent';

export default Accordion;
export { Accordion, AccordionTrigger, AccordionContent };
