import _ from 'lodash';

const buildDiff = (data1, data2) => {
  const keys = _.sortBy(_.union(_.keys(data1), _.keys(data2)));
  const diff = keys.map((key) => {
    if (!Object.hasOwn(data1, key)) {
      return { key, type: 'added', value: data2[key] };
    }
    if (!Object.hasOwn(data2, key)) {
      return { key, type: 'deleted', value: data1[key] };
    }
    if (_.isObject(data1[key]) && _.isObject(data2[key])) {
      return { key, type: 'nested', children: buildDiff(data1[key], data2[key]) };
    }
    if (data1[key] !== data2[key]) {
      return {
        key, type: 'changed', oldValue: data1[key], newValue: data2[key],
      };
    }
    return { key, type: 'unchanged', value: data1[key] };
  });

  return diff;
};

export default buildDiff;
