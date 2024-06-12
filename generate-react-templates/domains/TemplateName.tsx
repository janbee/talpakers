import { FC } from 'react';

interface TemplateNameProps {}

const TemplateNameComponent: FC<TemplateNameProps> = () => {
  return (
    <div data-testid="TemplateName">
      TemplateName Component
    </div>
  )
};
TemplateNameComponent.displayName = 'TemplateName'
export default TemplateNameComponent;
