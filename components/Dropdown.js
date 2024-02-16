import { useState } from 'react';
import { Listbox } from '@headlessui/react';
import { ChevronUpDownIcon } from '@heroicons/react/20/solid';

const types = [
  { organizationType: 'All' },
  { organizationType: 'Social' },
  { organizationType: 'Multicultural' },
  { organizationType: 'Professional' },
];

function Dropdown() {
  const [selectedOrganizationType, setSelectedOrganizationType] = useState(types[0]);

  return (
    <div className="relative w-28">
      <Listbox value={selectedOrganizationType} onChange={setSelectedOrganizationType}>

        <Listbox.Button className="relative w-full py-2 pl-2 pr-2 bg-white text-black text-left rounded-md cursor-default text-sm">
          {selectedOrganizationType.organizationType}
          <span className="absolute inset-y-0 right-0 flex items-center pr-1">
            <ChevronUpDownIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
          </span>
        </Listbox.Button>

        <Listbox.Options className="absolute w-full py-1 mt-1 bg-white text-black overflow-auto rounded-md shadow-lg max-h-60 text-sm z-10">
          {types.map((type, typeIdx) => (
            <Listbox.Option
              key={typeIdx}
              className={`relative cursor-default select-none py-2 pl-2 pr-2 text-left flex items-center ${selectedOrganizationType === type ? 'font-bold' : 'font-normal'}`}
              value={type}>
              <div className="relative w-full flex items-center">
                <span className={`block truncate`}>
                  {type.organizationType}
                </span>
              </div>
            </Listbox.Option>
          ))}
        </Listbox.Options>
      </Listbox>
    </div>
  );
}

export default Dropdown;