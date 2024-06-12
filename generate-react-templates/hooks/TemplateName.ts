import { useEffect, useState } from 'react';

const useTemplateName = () => {
  const [data, setData] = useState(true);

  useEffect(() => {}, []);

  return { data };
};

export default useTemplateName;
