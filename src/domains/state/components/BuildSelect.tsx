import { ChangeEvent, FC } from 'react';
import classNames from 'classnames';
import { Icon } from 'semantic-ui-react';

export interface BuildSelectProps {
  /** Build names that are actually available. */
  builds: string[];
  /** Currently selected build, or an empty string when the URL build is unknown. */
  value: string;
  loading?: boolean;
  /** Build taken from the URL, shown back to the user when it does not exist. */
  requestedBuild?: string;
  /** Whether `requestedBuild` is missing from `builds`. */
  unknown?: boolean;
  onSelect: (build: string) => void;
}

const helperId = 'build-select-help';

const BuildSelectComponent: FC<BuildSelectProps> = ({
  builds,
  value,
  loading = false,
  requestedBuild = '',
  unknown = false,
  onSelect,
}) => {
  const disabled = loading || builds.length === 0;

  const placeholder = loading
    ? 'Loading builds…'
    : builds.length === 0
    ? 'No builds available'
    : 'Select a build';

  return (
    <div className="flex flex-col items-center gap-2">
      <label htmlFor="build-select" className="text-xs uppercase tracking-wider text-neutral-500">
        Account
      </label>

      <div className="relative">
        <select
          id="build-select"
          data-testid="StateControl-BuildSelect"
          aria-label="Select build"
          aria-describedby={unknown ? helperId : undefined}
          value={value}
          disabled={disabled}
          onChange={(event: ChangeEvent<HTMLSelectElement>) => onSelect(event.target.value)}
          className={classNames(
            'appearance-none min-w-[220px] rounded-md border bg-neutral-800',
            'py-2 pl-3 pr-10 text-center font-mono text-lg text-white',
            'focus:outline-none focus:ring-2 focus:ring-green-600',
            'disabled:cursor-not-allowed disabled:opacity-60',
            { 'border-amber-500': unknown, 'border-neutral-600': !unknown }
          )}
        >
          <option value="">{placeholder}</option>
          {builds.map((build) => (
            <option key={build} value={build}>
              {build}
            </option>
          ))}
        </select>
        <Icon
          name="dropdown"
          aria-hidden="true"
          className={'!absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400 pointer-events-none'}
        />
      </div>

      {unknown && (
        <div id={helperId} data-testid="StateControl-BuildUnknown" role="status" className="max-w-sm text-xs text-amber-400">
          “{requestedBuild}” isn’t one of the {builds.length} builds reporting in — pick one from the list.
        </div>
      )}
    </div>
  );
};

BuildSelectComponent.displayName = 'BuildSelect';
export default BuildSelectComponent;
