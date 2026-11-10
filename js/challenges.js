/* Coding challenges. Python and JavaScript challenges call a function with test arguments.
   SQL challenges run against an in-browser SQLite database and are compared with a reference query,
   on a visible data set and on a hidden one. */
(() => {
  const C = (c) => PREP.challenge(c);

  // ---------------------------------------------------------------- Python / JavaScript
  C({
    id: "reverse-words", title: "Reverse the words", level: "Easy", topic: "Strings", langs: ["python", "javascript"],
    text: "Given a sentence, return the words in reverse order, separated by single spaces. Ignore extra spaces at the start, end or between words.",
    examples: [["\"hello big world\"", "\"world big hello\""], ["\"  one   two \"", "\"two one\""]],
    fn: { python: "reverse_words", javascript: "reverseWords" },
    starter: {
      python: "def reverse_words(sentence):\n    # your code here\n    return \"\"\n",
      javascript: "function reverseWords(sentence) {\n  // your code here\n  return \"\";\n}\n",
    },
    solution: {
      python: "def reverse_words(sentence):\n    return \" \".join(reversed(sentence.split()))\n",
      javascript: "function reverseWords(sentence) {\n  return sentence.trim().split(/\\s+/).filter(Boolean).reverse().join(\" \");\n}\n",
    },
    tests: [
      [["hello big world"], "world big hello"], [["  one   two "], "two one"], [["single"], "single"], [[""], ""],
      [["a b c d e"], "e d c b a"], [["   "], ""], [["Production support   on call"], "call on support Production"],
    ],
  });

  C({
    id: "palindrome", title: "Valid palindrome", level: "Easy", topic: "Strings", langs: ["python", "javascript"],
    text: "Return true if the text reads the same forwards and backwards, ignoring case and anything that isn't a letter or digit.",
    examples: [["\"A man, a plan, a canal: Panama\"", "true"], ["\"race a car\"", "false"]],
    fn: { python: "is_palindrome", javascript: "isPalindrome" },
    starter: {
      python: "def is_palindrome(text):\n    # your code here\n    return False\n",
      javascript: "function isPalindrome(text) {\n  // your code here\n  return false;\n}\n",
    },
    solution: {
      python: "def is_palindrome(text):\n    s = [c.lower() for c in text if c.isalnum()]\n    return s == s[::-1]\n",
      javascript: "function isPalindrome(text) {\n  const s = text.toLowerCase().replace(/[^a-z0-9]/g, \"\");\n  return s === [...s].reverse().join(\"\");\n}\n",
    },
    tests: [
      [["A man, a plan, a canal: Panama"], true], [["race a car"], false], [[""], true], [["No 'x' in Nixon"], true],
      [["12321"], true], [["12 3 1"], false], [["ab"], false], [["Was it a car or a cat I saw?"], true],
    ],
  });

  C({
    id: "fizzbuzz", title: "FizzBuzz", level: "Easy", topic: "Loops", langs: ["python", "javascript"],
    text: "Return a list of strings for the numbers 1 to n. Use \"Fizz\" for multiples of 3, \"Buzz\" for multiples of 5, \"FizzBuzz\" for multiples of both, and the number itself (as a string) otherwise.",
    examples: [["5", "[\"1\", \"2\", \"Fizz\", \"4\", \"Buzz\"]"]],
    fn: { python: "fizzbuzz", javascript: "fizzBuzz" },
    starter: {
      python: "def fizzbuzz(n):\n    result = []\n    # your code here\n    return result\n",
      javascript: "function fizzBuzz(n) {\n  const result = [];\n  // your code here\n  return result;\n}\n",
    },
    solution: {
      python: "def fizzbuzz(n):\n    out = []\n    for i in range(1, n + 1):\n        s = (\"Fizz\" if i % 3 == 0 else \"\") + (\"Buzz\" if i % 5 == 0 else \"\")\n        out.append(s or str(i))\n    return out\n",
      javascript: "function fizzBuzz(n) {\n  const out = [];\n  for (let i = 1; i <= n; i++) {\n    const s = (i % 3 === 0 ? \"Fizz\" : \"\") + (i % 5 === 0 ? \"Buzz\" : \"\");\n    out.push(s || String(i));\n  }\n  return out;\n}\n",
    },
    tests: [
      [[5], ["1", "2", "Fizz", "4", "Buzz"]], [[1], ["1"]], [[0], []],
      [[15], ["1", "2", "Fizz", "4", "Buzz", "Fizz", "7", "8", "Fizz", "Buzz", "11", "Fizz", "13", "14", "FizzBuzz"]],
    ],
  });

  C({
    id: "first-unique", title: "First non-repeating character", level: "Easy", topic: "Hash maps", langs: ["python", "javascript"],
    text: "Return the first character in the string that appears only once. Return an empty string if there isn't one. Upper and lower case count as different characters.",
    examples: [["\"swiss\"", "\"w\""], ["\"aabb\"", "\"\""]],
    fn: { python: "first_unique", javascript: "firstUnique" },
    starter: {
      python: "def first_unique(s):\n    # your code here\n    return \"\"\n",
      javascript: "function firstUnique(s) {\n  // your code here\n  return \"\";\n}\n",
    },
    solution: {
      python: "from collections import Counter\n\ndef first_unique(s):\n    counts = Counter(s)\n    return next((c for c in s if counts[c] == 1), \"\")\n",
      javascript: "function firstUnique(s) {\n  const counts = {};\n  for (const c of s) counts[c] = (counts[c] || 0) + 1;\n  for (const c of s) if (counts[c] === 1) return c;\n  return \"\";\n}\n",
    },
    tests: [[["swiss"], "w"], [["aabb"], ""], [["leetcode"], "l"], [["loveleetcode"], "v"], [[""], ""], [["aA"], "a"], [["zz y"], " "]],
  });

  C({
    id: "two-sum", title: "Two sum", level: "Easy", topic: "Hash maps", langs: ["python", "javascript"],
    text: "Given a list of numbers and a target, return the indexes [i, j] (with i < j) of the two numbers that add up to the target. Each input has exactly one answer. Try to do it in one pass.",
    examples: [["[2, 7, 11, 15], 9", "[0, 1]"], ["[3, 2, 4], 6", "[1, 2]"]],
    fn: { python: "two_sum", javascript: "twoSum" },
    starter: {
      python: "def two_sum(nums, target):\n    # your code here\n    return []\n",
      javascript: "function twoSum(nums, target) {\n  // your code here\n  return [];\n}\n",
    },
    solution: {
      python: "def two_sum(nums, target):\n    seen = {}\n    for i, n in enumerate(nums):\n        if target - n in seen:\n            return [seen[target - n], i]\n        seen[n] = i\n    return []\n",
      javascript: "function twoSum(nums, target) {\n  const seen = new Map();\n  for (let i = 0; i < nums.length; i++) {\n    if (seen.has(target - nums[i])) return [seen.get(target - nums[i]), i];\n    seen.set(nums[i], i);\n  }\n  return [];\n}\n",
    },
    tests: [[[[2, 7, 11, 15], 9], [0, 1]], [[[3, 2, 4], 6], [1, 2]], [[[3, 3], 6], [0, 1]], [[[-1, -2, -3, -4, -5], -8], [2, 4]], [[[0, 4, 3, 0], 0], [0, 3]], [[[1, 5, 9, 14], 23], [2, 3]]],
  });

  C({
    id: "valid-brackets", title: "Valid brackets", level: "Medium", topic: "Stacks", langs: ["python", "javascript"],
    text: "Given a string containing only ()[]{} characters, return true if every bracket is closed by the same type of bracket in the correct order.",
    examples: [["\"([]{})\"", "true"], ["\"([)]\"", "false"]],
    fn: { python: "is_valid", javascript: "isValid" },
    starter: {
      python: "def is_valid(s):\n    # your code here\n    return False\n",
      javascript: "function isValid(s) {\n  // your code here\n  return false;\n}\n",
    },
    solution: {
      python: "def is_valid(s):\n    pairs = {')': '(', ']': '[', '}': '{'}\n    stack = []\n    for c in s:\n        if c in pairs:\n            if not stack or stack.pop() != pairs[c]:\n                return False\n        else:\n            stack.append(c)\n    return not stack\n",
      javascript: "function isValid(s) {\n  const pairs = { ')': '(', ']': '[', '}': '{' };\n  const stack = [];\n  for (const c of s) {\n    if (pairs[c]) {\n      if (stack.pop() !== pairs[c]) return false;\n    } else stack.push(c);\n  }\n  return stack.length === 0;\n}\n",
    },
    tests: [[["([]{})"], true], [["([)]"], false], [["()"], true], [[""], true], [["("], false], [["]"], false], [["{[()()]}"], true], [["(((("], false], [["(]"], false]],
  });

  C({
    id: "error-counts", title: "Count errors per service (log analysis)", level: "Medium", topic: "Production support", langs: ["python", "javascript"],
    text: "Each log line looks like \"2026-11-10 10:00:01 ERROR payment Timeout calling bank\": date, time, level, service name, then the message. Return a dictionary/object mapping each service to the number of ERROR lines it has. Ignore other levels and blank or malformed lines (fewer than 4 parts).",
    examples: [["[\"2026-11-10 10:00:01 ERROR payment Timeout\", \"2026-11-10 10:00:02 INFO payment OK\", \"2026-11-10 10:00:03 ERROR login Bad token\"]", "{\"payment\": 1, \"login\": 1}"]],
    fn: { python: "error_counts", javascript: "errorCounts" },
    starter: {
      python: "def error_counts(lines):\n    counts = {}\n    # your code here\n    return counts\n",
      javascript: "function errorCounts(lines) {\n  const counts = {};\n  // your code here\n  return counts;\n}\n",
    },
    solution: {
      python: "def error_counts(lines):\n    counts = {}\n    for line in lines:\n        parts = line.split()\n        if len(parts) >= 4 and parts[2] == \"ERROR\":\n            counts[parts[3]] = counts.get(parts[3], 0) + 1\n    return counts\n",
      javascript: "function errorCounts(lines) {\n  const counts = {};\n  for (const line of lines) {\n    const p = line.trim().split(/\\s+/);\n    if (p.length >= 4 && p[2] === \"ERROR\") counts[p[3]] = (counts[p[3]] || 0) + 1;\n  }\n  return counts;\n}\n",
    },
    tests: [
      [[["2026-11-10 10:00:01 ERROR payment Timeout", "2026-11-10 10:00:02 INFO payment OK", "2026-11-10 10:00:03 ERROR login Bad token"]], { payment: 1, login: 1 }],
      [[[]], {}],
      [[["2026-11-10 10:00:01 WARN db Slow query", "", "garbage"]], {}],
      [[["2026-11-10 10:00:01 ERROR db Down", "2026-11-10 10:00:05 ERROR db Down", "2026-11-10 10:01:00 ERROR api 500", "2026-11-10 10:02:00 error api lowercase is not ERROR"]], { db: 2, api: 1 }],
    ],
  });

  C({
    id: "max-subarray", title: "Maximum subarray sum", level: "Medium", topic: "Arrays", langs: ["python", "javascript"],
    text: "Return the largest sum of any contiguous, non-empty part of the list. The list has at least one number and may contain negatives.",
    examples: [["[-2, 1, -3, 4, -1, 2, 1, -5, 4]", "6  (from [4, -1, 2, 1])"], ["[-3, -1, -2]", "-1"]],
    fn: { python: "max_subarray", javascript: "maxSubarray" },
    starter: {
      python: "def max_subarray(nums):\n    # your code here\n    return 0\n",
      javascript: "function maxSubarray(nums) {\n  // your code here\n  return 0;\n}\n",
    },
    solution: {
      python: "def max_subarray(nums):\n    best = cur = nums[0]\n    for n in nums[1:]:\n        cur = max(n, cur + n)\n        best = max(best, cur)\n    return best\n",
      javascript: "function maxSubarray(nums) {\n  let best = nums[0], cur = nums[0];\n  for (const n of nums.slice(1)) {\n    cur = Math.max(n, cur + n);\n    best = Math.max(best, cur);\n  }\n  return best;\n}\n",
    },
    tests: [[[[-2, 1, -3, 4, -1, 2, 1, -5, 4]], 6], [[[-3, -1, -2]], -1], [[[5]], 5], [[[1, 2, 3]], 6], [[[5, -9, 6, -2, 3]], 7], [[[-1, 3, -1, 3, -10, 2]], 5]],
  });

  C({
    id: "merge-intervals", title: "Merge maintenance windows", level: "Medium", topic: "Sorting", langs: ["python", "javascript"],
    text: "Each window is [start, end] in minutes. Merge all overlapping or touching windows (e.g. [1, 3] and [3, 5] become [1, 5]) and return them sorted by start time.",
    examples: [["[[1, 3], [2, 6], [8, 10], [15, 18]]", "[[1, 6], [8, 10], [15, 18]]"]],
    fn: { python: "merge_windows", javascript: "mergeWindows" },
    starter: {
      python: "def merge_windows(windows):\n    # your code here\n    return []\n",
      javascript: "function mergeWindows(windows) {\n  // your code here\n  return [];\n}\n",
    },
    solution: {
      python: "def merge_windows(windows):\n    out = []\n    for s, e in sorted(windows):\n        if out and s <= out[-1][1]:\n            out[-1][1] = max(out[-1][1], e)\n        else:\n            out.append([s, e])\n    return out\n",
      javascript: "function mergeWindows(windows) {\n  const out = [];\n  for (const [s, e] of [...windows].sort((a, b) => a[0] - b[0])) {\n    if (out.length && s <= out[out.length - 1][1]) out[out.length - 1][1] = Math.max(out[out.length - 1][1], e);\n    else out.push([s, e]);\n  }\n  return out;\n}\n",
    },
    tests: [[[[[1, 3], [2, 6], [8, 10], [15, 18]]], [[1, 6], [8, 10], [15, 18]]], [[[[1, 3], [3, 5]]], [[1, 5]]], [[[]], []], [[[[5, 7], [1, 2]]], [[1, 2], [5, 7]]], [[[[1, 10], [2, 3], [4, 5]]], [[1, 10]]], [[[[6, 8], [1, 9], [2, 4], [4, 7]]], [[1, 9]]]],
  });

  C({
    id: "top-words", title: "Top k frequent words", level: "Medium", topic: "Hash maps", langs: ["python", "javascript"],
    text: "Return the k most frequent words, most frequent first. If two words have the same count, put them in alphabetical order. Words are already lower case.",
    examples: [["[\"error\", \"warn\", \"error\", \"info\", \"warn\", \"error\"], 2", "[\"error\", \"warn\"]"]],
    fn: { python: "top_words", javascript: "topWords" },
    starter: {
      python: "def top_words(words, k):\n    # your code here\n    return []\n",
      javascript: "function topWords(words, k) {\n  // your code here\n  return [];\n}\n",
    },
    solution: {
      python: "from collections import Counter\n\ndef top_words(words, k):\n    counts = Counter(words)\n    return sorted(counts, key=lambda w: (-counts[w], w))[:k]\n",
      javascript: "function topWords(words, k) {\n  const c = {};\n  for (const w of words) c[w] = (c[w] || 0) + 1;\n  return Object.keys(c).sort((a, b) => c[b] - c[a] || (a < b ? -1 : 1)).slice(0, k);\n}\n",
    },
    tests: [[[["error", "warn", "error", "info", "warn", "error"], 2], ["error", "warn"]], [[["b", "a", "c"], 2], ["a", "b"]], [[["x"], 1], ["x"]], [[["the", "day", "is", "sunny", "the", "the", "the", "sunny", "is", "is"], 4], ["the", "is", "sunny", "day"]]],
  });

  C({
    id: "longest-unique", title: "Longest substring without repeats", level: "Medium", topic: "Sliding window", langs: ["python", "javascript"],
    text: "Return the length of the longest part of the string that has no repeated characters.",
    examples: [["\"abcabcbb\"", "3  (\"abc\")"], ["\"bbbbb\"", "1"]],
    fn: { python: "longest_unique", javascript: "longestUnique" },
    starter: {
      python: "def longest_unique(s):\n    # your code here\n    return 0\n",
      javascript: "function longestUnique(s) {\n  // your code here\n  return 0;\n}\n",
    },
    solution: {
      python: "def longest_unique(s):\n    last, start, best = {}, 0, 0\n    for i, c in enumerate(s):\n        if c in last and last[c] >= start:\n            start = last[c] + 1\n        last[c] = i\n        best = max(best, i - start + 1)\n    return best\n",
      javascript: "function longestUnique(s) {\n  const last = new Map();\n  let start = 0, best = 0;\n  [...s].forEach((c, i) => {\n    if (last.has(c) && last.get(c) >= start) start = last.get(c) + 1;\n    last.set(c, i);\n    best = Math.max(best, i - start + 1);\n  });\n  return best;\n}\n",
    },
    tests: [[["abcabcbb"], 3], [["bbbbb"], 1], [["pwwkew"], 3], [[""], 0], [["abba"], 2], [["dvdf"], 3], [["abcdef"], 6]],
  });

  C({
    id: "disk-alerts", title: "Disk usage alerts (SRE)", level: "Easy", topic: "Production support", langs: ["python", "javascript"],
    text: "Each disk is [mount, used_gb, total_gb]. Return the mounts whose usage is at least the threshold percentage, highest usage first (ties in mount name order). Ignore disks with total_gb of 0.",
    examples: [["[[\"/\", 45, 50], [\"/data\", 400, 1000], [\"/var\", 18, 20]], 85", "[\"/\", \"/var\"]  (90% and 90%: tie, so by name)"]],
    fn: { python: "disk_alerts", javascript: "diskAlerts" },
    starter: {
      python: "def disk_alerts(disks, threshold):\n    # your code here\n    return []\n",
      javascript: "function diskAlerts(disks, threshold) {\n  // your code here\n  return [];\n}\n",
    },
    solution: {
      python: "def disk_alerts(disks, threshold):\n    hits = [(used / total * 100, m) for m, used, total in disks if total > 0 and used / total * 100 >= threshold]\n    return [m for pct, m in sorted(hits, key=lambda x: (-x[0], x[1]))]\n",
      javascript: "function diskAlerts(disks, threshold) {\n  return disks\n    .filter(([, used, total]) => total > 0 && (used / total) * 100 >= threshold)\n    .map(([m, used, total]) => [m, (used / total) * 100])\n    .sort((a, b) => b[1] - a[1] || (a[0] < b[0] ? -1 : 1))\n    .map(([m]) => m);\n}\n",
    },
    tests: [
      [[[["/", 45, 50], ["/data", 400, 1000], ["/var", 18, 20]], 85], ["/", "/var"]], [[[], 80], []], [[[["/tmp", 0, 0], ["/opt", 99, 100]], 90], ["/opt"]],
      [[[["/a", 80, 100], ["/b", 95, 100], ["/c", 85, 100]], 80], ["/b", "/c", "/a"]], [[[["/a", 79, 100]], 80], []],
    ],
  });

  C({
    id: "lru-cache", title: "LRU cache", level: "Hard", topic: "Design", langs: ["python", "javascript"],
    text: "Simulate a least-recently-used cache with the given capacity. Each operation is [\"put\", key, value] or [\"get\", key]. A get returns the value (or -1 if missing) and marks the key as recently used; a put inserts/updates and marks it as recently used, evicting the least recently used key if the cache is over capacity. Return the list of results of all get operations, in order.",
    examples: [["2, [[\"put\",1,1],[\"put\",2,2],[\"get\",1],[\"put\",3,3],[\"get\",2],[\"get\",3]]", "[1, -1, 3]"]],
    fn: { python: "lru_results", javascript: "lruResults" },
    starter: {
      python: "def lru_results(capacity, operations):\n    results = []\n    # your code here\n    return results\n",
      javascript: "function lruResults(capacity, operations) {\n  const results = [];\n  // your code here\n  return results;\n}\n",
    },
    solution: {
      python: "from collections import OrderedDict\n\ndef lru_results(capacity, operations):\n    cache, out = OrderedDict(), []\n    for op in operations:\n        if op[0] == \"get\":\n            if op[1] in cache:\n                cache.move_to_end(op[1])\n                out.append(cache[op[1]])\n            else:\n                out.append(-1)\n        else:\n            cache[op[1]] = op[2]\n            cache.move_to_end(op[1])\n            if len(cache) > capacity:\n                cache.popitem(last=False)\n    return out\n",
      javascript: "function lruResults(capacity, operations) {\n  const cache = new Map(), out = [];\n  for (const [op, k, v] of operations) {\n    if (op === \"get\") {\n      if (!cache.has(k)) { out.push(-1); continue; }\n      const val = cache.get(k); cache.delete(k); cache.set(k, val); out.push(val);\n    } else {\n      cache.delete(k); cache.set(k, v);\n      if (cache.size > capacity) cache.delete(cache.keys().next().value);\n    }\n  }\n  return out;\n}\n",
    },
    tests: [
      [[2, [["put", 1, 1], ["put", 2, 2], ["get", 1], ["put", 3, 3], ["get", 2], ["get", 3]]], [1, -1, 3]],
      [[1, [["put", "a", 1], ["put", "b", 2], ["get", "a"], ["get", "b"]]], [-1, 2]],
      [[2, [["put", 1, 1], ["put", 2, 2], ["put", 1, 10], ["put", 3, 3], ["get", 1], ["get", 2], ["get", 3]]], [10, -1, 3]],
      [[3, [["get", 9]]], [-1]],
    ],
  });

  // ---------------------------------------------------------------- SQL (SQLite)
  const SCHEMA = `
CREATE TABLE departments (id INTEGER PRIMARY KEY, name TEXT);
CREATE TABLE employees (id INTEGER PRIMARY KEY, name TEXT, dept_id INTEGER, salary INTEGER, manager_id INTEGER, hire_date TEXT);
CREATE TABLE customers (id INTEGER PRIMARY KEY, name TEXT, city TEXT);
CREATE TABLE orders (id INTEGER PRIMARY KEY, customer_id INTEGER, amount REAL, order_date TEXT);`;
  const DATA_A = `
INSERT INTO departments VALUES (1,'Engineering'),(2,'Support'),(3,'Sales'),(4,'Research');
INSERT INTO employees VALUES
 (1,'Asha',1,95000,NULL,'2019-03-01'),(2,'Brian',1,72000,1,'2021-06-15'),(3,'Chen',1,98000,1,'2020-01-10'),
 (4,'Deepa',2,48000,6,'2022-09-01'),(5,'Eoin',2,52000,6,'2023-02-20'),(6,'Fatima',2,61000,NULL,'2018-11-05'),
 (7,'Gopal',3,58000,NULL,'2020-07-07'),(8,'Hannah',3,58000,7,'2021-04-12'),(9,'Ivan',3,45000,7,'2024-01-08');
INSERT INTO customers VALUES (1,'Acme Ltd','Dublin'),(2,'Bharat Foods','Mumbai'),(3,'Celtic Tours','Cork'),(4,'Delta Pay','Dublin'),(5,'Everest IT','Pune');
INSERT INTO orders VALUES (1,1,250.0,'2026-01-15'),(2,1,120.5,'2026-02-03'),(3,2,980.0,'2026-01-20'),(4,4,60.0,'2026-03-11'),(5,2,40.0,'2026-03-30'),(6,1,300.0,'2026-03-02');`;
  const DATA_B = `
INSERT INTO departments VALUES (1,'Platform'),(2,'Data'),(3,'QA'),(4,'Design'),(5,'Ops');
INSERT INTO employees VALUES
 (1,'Ravi',1,120000,NULL,'2015-05-05'),(2,'Sara',1,120000,1,'2019-09-09'),(3,'Tom',2,70000,NULL,'2020-02-02'),
 (4,'Uma',2,90000,3,'2021-03-03'),(5,'Vik',3,40000,NULL,'2022-04-04'),(6,'Wen',3,39000,5,'2023-05-05'),
 (7,'Xia',4,65000,1,'2024-06-06'),(8,'Yusuf',2,90000,3,'2018-08-08');
INSERT INTO customers VALUES (1,'Zeta','Galway'),(2,'Omega','Delhi'),(3,'Kappa','Dublin'),(4,'Sigma','Limerick');
INSERT INTO orders VALUES (1,3,10.0,'2026-02-14'),(2,3,15.5,'2026-02-28'),(3,1,700.0,'2026-04-01'),(4,3,5.0,'2026-04-15');`;
  const SQL_TABLES = "departments(id, name)\nemployees(id, name, dept_id, salary, manager_id, hire_date)\ncustomers(id, name, city)\norders(id, customer_id, amount, order_date)";
  const S = (c) => C({ ...c, langs: ["sql"], schema: SCHEMA, data: [DATA_A, DATA_B], tables: SQL_TABLES, starter: { sql: c.starter || "SELECT \n" } });

  S({
    id: "sql-high-earners", title: "High earners", level: "Easy", topic: "Filtering",
    text: "List the name and salary of every employee earning more than 60000, highest salary first. If salaries tie, order by name.",
    ordered: true,
    solution: { sql: "SELECT name, salary FROM employees WHERE salary > 60000 ORDER BY salary DESC, name;" },
  });
  S({
    id: "sql-dept-headcount", title: "Headcount per department", level: "Easy", topic: "Joins & grouping",
    text: "Return every department's name and its number of employees, including departments with no employees (count 0). Any row order is fine.",
    solution: { sql: "SELECT d.name, COUNT(e.id) AS headcount FROM departments d LEFT JOIN employees e ON e.dept_id = d.id GROUP BY d.id, d.name;" },
  });
  S({
    id: "sql-second-salary", title: "Second-highest salary", level: "Medium", topic: "Subqueries",
    text: "Return a single value: the second-highest distinct salary in the employees table.",
    solution: { sql: "SELECT MAX(salary) FROM employees WHERE salary < (SELECT MAX(salary) FROM employees);" },
  });
  S({
    id: "sql-no-orders", title: "Customers with no orders", level: "Medium", topic: "Joins",
    text: "Return the names of customers who have never placed an order. Any row order is fine.",
    solution: { sql: "SELECT c.name FROM customers c LEFT JOIN orders o ON o.customer_id = c.id WHERE o.id IS NULL;" },
  });
  S({
    id: "sql-beats-manager", title: "Earns more than their manager", level: "Medium", topic: "Self joins",
    text: "Return the names of employees whose salary is higher than their own manager's salary. Any row order is fine.",
    solution: { sql: "SELECT e.name FROM employees e JOIN employees m ON e.manager_id = m.id WHERE e.salary > m.salary;" },
  });
  S({
    id: "sql-customer-totals", title: "Best customers", level: "Medium", topic: "Grouping",
    text: "For each customer who has orders, return the customer name, the number of orders and the total amount. Order by total amount, highest first.",
    ordered: true,
    solution: { sql: "SELECT c.name, COUNT(o.id) AS orders, SUM(o.amount) AS total FROM customers c JOIN orders o ON o.customer_id = c.id GROUP BY c.id, c.name ORDER BY total DESC;" },
  });
  S({
    id: "sql-top-per-dept", title: "Top earner in each department", level: "Hard", topic: "Window functions",
    text: "For each department that has employees, return the department name, the employee name and salary of its highest-paid employee. If several people share the top salary, return all of them. Any row order is fine.",
    solution: { sql: "SELECT d.name AS department, e.name, e.salary FROM employees e JOIN departments d ON d.id = e.dept_id WHERE e.salary = (SELECT MAX(salary) FROM employees x WHERE x.dept_id = e.dept_id);" },
  });
  S({
    id: "sql-monthly-revenue", title: "Revenue by month", level: "Medium", topic: "Dates",
    text: "Return each month that has orders as 'YYYY-MM' (column month) with its total order amount (column revenue), oldest month first. Tip: this database is SQLite, so use strftime('%Y-%m', order_date).",
    ordered: true,
    solution: { sql: "SELECT strftime('%Y-%m', order_date) AS month, SUM(amount) AS revenue FROM orders GROUP BY month ORDER BY month;" },
  });
})();
