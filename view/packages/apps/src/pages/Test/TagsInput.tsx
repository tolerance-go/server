import TagsInput from '@/components/TagsInput';
import { useState } from 'react';

export default function App() {
  const [value, setValue] = useState<string[]>();
  return <TagsInput value={value} onChange={setValue}></TagsInput>;
}
