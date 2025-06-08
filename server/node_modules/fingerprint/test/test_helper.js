function largestLineIn(lines) {
  return lines.reduce(function(n, line) {
    return Math.max(n, line.length);
  }, 0);
}

module.exports.diff = function(actual, expected) {
  var actual   = actual.split('\n'),
      expected = expected.split('\n'),
      len      = largestLineIn(expected);

  console.error('  expected');
  expected.forEach(function(line, i){
    var other = actual[i],
        pad   = len - line.length,
        pad   = Array(++pad).join(' '),
        same  = line == other;
    if (same) {
      console.error('  %d| %j%s | %j', i+1, line, pad, other);
    } else {
      console.error('  \033[31m%d| %j%s | %j\033[0m', i+1, line, pad, other);
    }
  });
}

module.exports.finish = function(count, failures) {
  console.log();
  console.log('  \033[90mcompleted\033[0m \033[32m%d\033[0m \033[90mtests\033[0m', count);

  if (failures) {
    console.error('  \033[90mfailed\033[0m \033[31m%d\033[0m \033[90mtests\033[0m', failures);
    process.exit(failures);
  }

  console.log();
}

module.exports.format = function(name, options) {
  var buff = name + '\033[37m\ [';
  if(options.strategy)
    buff += ' strategy => ' + options.strategy;
  buff += ' rename => ' + (options.rename ? 'yes' : 'no');
  buff += ' ]';
  return buff;
}
