/*
 * Licensed to Elasticsearch B.V. under one or more contributor
 * license agreements. See the NOTICE file distributed with
 * this work for additional information regarding copyright
 * ownership. Elasticsearch B.V. licenses this file to you under
 * the Apache License, Version 2.0 (the "License"); you may
 * not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *    http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */

/* eslint no-unused-vars: 0 */

import { run, createFlagError } from '@kbn/dev-utils';
import * as jetpack from 'fs-jetpack';

export const relocateBenchmarkApp = _ => {
  run(({ flags, log }) => {
    const { kibanaParentPath, benchmarkAppPath } = administrivia(flags, log);
    relocate(kibanaParentPath)(benchmarkAppPath)(log);
  }, description());
};

const flags = {
  string: ['kibanaParentPath', 'verbose', 'benchmarkAppPath'],
  help: `
--kibanaParentPath Required, path to kibana's parent directory
--benchmarkAppPath Required, path to benchmark's directory
`,
};

function description() {
  return {
    description: `
Move the benchmark 'app' to live next to kibana, since the app is destructive
`,
    flags,
  };
}

function relocate(kibanaParentPath) {
  return benchmarkAppPath => async log => {
    log.verbose(`\n### kibanaParentPath: \n\t${kibanaParentPath}`);
    log.verbose(`\n### benchmarkAppPath: \n\t${benchmarkAppPath}`);

    await jetpack.copyAsync(
      '/Users/tre/development/projects/kibana/src/dev/perf_test_ftr/benchmark',
      '/Users/tre/development/projects/perf_test_external/benchmark',
      { overwrite: true }
    );
  };
}

function administrivia(flags, log) {
  if (flags.kibanaParentPath === '')
    throw createFlagError('Please provide a single --kibanaParentPath flag');
  if (flags.benchmarkAppPath === '')
    throw createFlagError('Please provide a single --benchmarkAppPath flag');
  if (flags.verbose) log.verbose(`### Verbose logging enabled`);

  return flags;
}
