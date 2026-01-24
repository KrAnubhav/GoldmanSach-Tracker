export const INTERVIEW_EXPERIENCES = [
  {
    id: 1,
    role: "GS Associate",
    yoe: "2.3 years",
    date: "Oct 21, 2025",
    author: "Anonymous User",
    rounds: [
      {
        name: "Coderpad round - 1",
        content: "Was asked to solve 2 DSA questions -\n1. Basically an easier version of https://algo.monster/liteproblems/1804 with only insert(word) and countWordsStartingWith(prefix)\n2. Find the size of the largest connected component in a forest."
      },
      {
        name: "Coderpad round - 2",
        content: "Was asked to solve 2 DSA questions -\n1. Need to implement a class which will support 2 operations -\n   i. insert(num) - insert a number to the data structure\n   ii. isTopK(num) - tell whether a number is in the top K most frequent numbers in the data structure\n2. First non repeated character in a string. Had a discussion about how to extend the algorithm in case of a large strings which can't be fit into RAM of a single machine."
      },
      {
        name: "Software Engineering Practices - 1",
        content: "Was given a code snippet in Java and was asked to identify the issue in it.\nHow hashmap works? Different types of exception in Java ?\nProject discussion"
      },
      {
        name: "Software Engineering Practices - 2",
        content: "Design a rate limiter. Had a meaningful discussion. Then mentioned about Leaky bucket algorithm. Was finally asked to write a code snippet for the leaky bucket algorithm. [ Was asked about how can we select the leak rate and bucket size for the leaky bucket algo ?]"
      },
      {
        name: "System design round",
        content: "Verbal discussion about LLD of an over simplified stock market. (No coding).\nExtend the LLD to a HLD. Had discussion about transactions and locking in DB.\nResume grilling."
      }
    ]
  },
  {
    id: 2,
    role: "Analyst | Bangalore",
    yoe: "N/A",
    date: "Oct 21, 2025",
    author: "Aasheesh_Mahammad",
    rounds: [
      {
        name: "Online Assessment (OA)",
        content: "Standard coding problems focused on arrays, strings, and time/space complexity."
      },
      {
        name: "CoderPad Screening",
        content: "A live coding session focusing on problem-solving speed, correctness, and clarity.\nQuestions asked:\n• Find the Length of Cycle in an Array 🔄\n• Number of Islands 🏝️ (interviewer preferred BFS over DFS to avoid stack overflow)"
      },
      {
        name: "Superday Round 1 – DSA",
        content: "• Minimum Characters to Remove from the left, right, or both ends to make a string palindrome\n• Binary Search Assignment (similar to Koko Eating Bananas)"
      },
      {
        name: "Superday Round 2 – DSA",
        content: "• Coin Change (Minimum number of coins to make amount)\n• Container With Most Water 💧 (Follow-up: what if container is tilted?)"
      },
      {
        name: "Superday Round 3 – Low-Level Design (LLD)",
        content: "Design a Traffic Light System 🚦 that dynamically adjusts wait times based on real-time traffic data.\nFocus on simplicity, scalability, and trade-offs."
      },
      {
        name: "Superday Round 4 – Behavioural / HR",
        content: "Topics: Past projects, ownership, challenges, deadlines, conflicts, motivation.\n\nScenario: You overhear in a lift that a colleague, who was expecting a salary hike, is actually not going to get one. How would you handle this situation while maintaining professionalism and confidentiality?"
      },
      {
        name: "💡 Tips",
        content: "• Revise BFS/DFS, DP, two-pointer, binary search, and string manipulation.\n• Communicate logic clearly and walk through examples.\n• In LLD, focus on simplicity, scalability, and trade-offs.\n• For HR, prepare structured stories (STAR method) highlighting ownership and teamwork."
      }
    ]
  },
  {
    id: 3,
    role: "SDE",
    yoe: "N/A",
    date: "Oct 23, 2025",
    author: "Anonymous User",
    rounds: [
      {
        name: "Online Assessment (OA)",
        content: "2 questions were asked. Both were Leetcode medium difficulty. Only DSA questions."
      },
      {
        name: "Coderpad Round",
        content: "Problem: Virus propagation in a graph (Uni-directional, no cycles). Given an ID of a person, that person gets the virus. Return all the set of people who will get the virus.\n\nFollow-up: Instead of one ID, now input is a list of IDs. Achieve this with minimal code changes."
      },
      {
        name: "Superday Round 1 – DSA",
        content: "Problem 1: Given a list of building heights. Return the top k tallest buildings.\n\nProblem 2: A graph problem (Leetcode Medium). Involved BFS and Topological sort. Direct implementation question."
      },
      {
        name: "Superday Round 2 – Software Engineering",
        content: "• Many questions from resume.\n• OOPS questions.\n• Different Java HashMap types and time complexity of their operations.\n• 1 puzzle question.\n• Generic SDLC practices questions."
      },
      {
        name: "Superday Round 3 – System Design",
        content: "• Design LRU cache.\n• Resume based questions."
      },
      {
        name: "Hiring Manager Round",
        content: "Very few technical questions. Mostly behavioral and situation-based questions."
      },
      {
        name: "Verdict & Tips",
        content: "Verdict: SELECTED\n\nTips:\n• Be careful with resume keywords. If you mention 'caching', know eviction policies, types, etc. Know at least 80% of concepts around your keywords.\n• Timeline: GS process takes 1-2 months. Patience is key."
      }
    ]
  },
  {
    id: 4,
    role: "Analyst (Software Engineer)",
    yoe: "N/A",
    date: "Oct 12, 2025",
    author: "Heisenberg14",
    rounds: [
      {
        name: "Round 1: Hackerrank OA",
        content: "2 medium level questions to be solved under 70 mins.\n• String compression: aaGGbbbc -> 2a2G3b1c\n• Vector compression: Given a vector, compress characters appearing ≥ threshold."
      },
      {
        name: "Round 2: Coderpad Round",
        content: "• Question 1: Longest strictly increasing subsequence of dwarfs heights, picking only from start or end.\n• Question 2: Sqrt(n) without inbuilt methods, valid to 2 decimal places."
      },
      {
        name: "Round 3: Superday - Data Structure",
        content: "• In-depth project grilling session.\n• Find peak element (LeetCode 162). Optimized from O(NlogN) to O(N) to O(logN).\n• Follow-up: Find an element in the same array where repetition is allowed; return all indices."
      },
      {
        name: "Round 4: Superday - Software Engineering Practices",
        content: "• Question 1: Evaluate Division (LeetCode 399). Explained and coded DFS approach.\n• Question 2: Count Submatrices with All Ones (LeetCode 1504). Optimized from O(N⁴) to O(N³)."
      },
      {
        name: "Round 5: Superday - Software Design & Architecture",
        content: "• Architecture discussion of current project.\n• Design Challenge: Design a Notification Service. Implemented using Observer pattern and Pub-Sub push-based approach."
      },
      {
        name: "Round 6: Managerial Round 1",
        content: "One of the toughest behavioral rounds. Straight to project deep-dives without intro. 45 mins of pressure testing and technical decision justification."
      },
      {
        name: "Round 7: Managerial Round 2",
        content: "10-15 min informal discussion. Felt like a formality call compared to the intensity of the previous round."
      }
    ]
  },
  {
    id: 5,
    role: "Analyst",
    yoe: "1.2 YOE",
    date: "Oct 07, 2025",
    author: "Anonymous User",
    rounds: [
      {
        name: "About Me",
        content: "Education: B.Tech in Computer Science (Tier-2 College)\nCurrent Role: SDE-1 at a major startup\nExperience: 1.2 years of full-time experience"
      },
      {
        name: "Application",
        content: "Recruiter reached out to me over email with job link and the HackerRank assessment link. I applied through that and completed the online test."
      },
      {
        name: "Round 1 - Online Assessment (HackerRank)",
        content: "There were 2 coding questions:\nQ1: Easy-level math-based question involving modular arithmetic.\nQ2: Array + logic-based combinatorics problem (medium difficulty).\nI was able to solve both completely."
      },
      {
        name: "Round 2 - CoderPad Technical Round",
        content: "Platform: CoderPad (Live Coding)\nQ1: Max IP Count problem - involved handling log data and finding the IP address with maximum count. Discussed multiple follow-ups and corner cases.\nQ2: Grid-based Dynamic Programming problem - standard variation requiring counting paths with maximum value (classic DP grid traversal pattern).\nI solved both problems, though I was slightly stuck on one of the follow-up questions in Problem 1."
      },
      {
        name: "Round 3 - Superday Round (Data Structures)",
        content: "This was a live virtual panel round with 2 interviewers.\nQ1: Median of Two Sorted Arrays - discussed brute-force, optimal binary search approach, and time/space complexity.\nQ2: Longest Substring Without Repeating Characters - explained brute-force and optimized sliding window approach, also covered complexity analysis.\nRound went well - I was able to explain my thought process, and the interviewer seemed satisfied, mentioning 'good' a couple of times."
      },
      {
        name: "Result",
        content: "After this round, I was informed that I was not shortlisted for further Superday rounds."
      }
    ]
  },
  {
    id: 6,
    role: "Associate | Bangalore",
    yoe: "3 years",
    date: "August 2025",
    author: "Anonymous User",
    rounds: [
      {
        name: "Interview Details",
        content: "Interview Mode: Online\nMonth: June 2025 - August 2025\nProcess: Online Assessment + 4 Rounds (Technical ~1 hour) + HM round (~30 min)\nLocation: Bangalore\nYOE: 3 years"
      },
      {
        name: "Online Assessment",
        content: "2 Questions (LeetCode style)\n1 easy\n1 medium (time complexity focused)\nCleared and got mail in ~3 days for interviews."
      },
      {
        name: "Round 1 (Technical DSA ~1 hour)",
        content: "Asked 2 DSA questions (coding on shared editor):\nProblem 1: Given a string representing a fraction, e.g., \"2/5\", return the decimal representation of that fraction. It can have negative value as well, e.g., \"-2/5\"\nOutput:- 2/3 → \"0.(6) \"\nProblem 2: Didn't fully recall, but it was linked list easy-medium.\nTest cases were already there in the boiler plate code, I have to pass all of them.\nAfter 2 weeks I got an email for superday rounds."
      },
      {
        name: "Superday Round 1 (DSA ~1 hour)",
        content: "Q1: Check if the string has a cycle or not (I have to write the optimized code).\nQ2: Build a calculator → Given a string \"(2 * 5 + 7) \", return evaluated integer. It was a bit lenghty as interviewer told in between that it can have brackets as well.\nHad to parse the expression, handle precedence of operators.\nI was able to solve both the questions."
      },
      {
        name: "Superday Round 2 (DSA + System Design Lite)",
        content: "Q1 (Dynamic Programming): 2D array → Find maximum value travelling only diagonally up, diagonally down, or right. I told the recursion and then solved it using optimized approach. Few follow-up questions, if directions are changed.\nQ2 (Data Structures):\nGiven a log file of store visits → build a data structure to efficiently query if ≥2 different customers visited the same store on a given day. I wrote a Data structure using Map and Set.\nFollow-ups:\nHow to implement using DB or any other way?\nTrade-offs in approach (space vs query efficiency)."
      },
      {
        name: "Superday Round 3 (System Design – Twitter Clone)",
        content: "Design Twitter:\nFirst half → LLD (Classes & Models): Users, Tweets, Follows.\nSecond half → HLD (Scalability):\nHow to notify millions of users simultaneously.\nDiscussion on queues, database usage, caching, scaling, microservices, kafka.\nI cleared all the rounds, after an hour I got the call for HM round."
      },
      {
        name: "Superday Round 4 (Hiring Manager)",
        content: "Deep dive into recent project architecture.\nQuestions on Agile methodology:\nPros & cons, handling sprint delays.\nLeadership & Situational:\nExample: Handling conflicts in team, prioritizing features vs deadlines.\nPS:- I have got the offer :)"
      }
    ]
  },
  {
    id: 7,
    role: "Associate",
    yoe: "N/A",
    date: "Oct 02, 2025",
    author: "Anonymous User",
    rounds: [
      {
        name: "Applied Through Referral",
        content: "Applied Through Referral"
      },
      {
        name: "OA",
        content: "Two medium level leetcode questions"
      },
      {
        name: "CoderPad - 1 (1 Hr C++)",
        content: "Trie based question\nSimple Dfs based question"
      },
      {
        name: "Round - 1 (DSA)(1 Hr C++)",
        content: "Some resume based questions\nDsa question - based on hashmap\nBinary Search tree question + two pointers"
      },
      {
        name: "Round - 2",
        content: "Resume Based questions\nJava concurrency problem\nsql questions\n1 Dsa question - leetcode medium"
      },
      {
        name: "Round - 3(1 Hr)",
        content: "Some resume based questions\nHLD - Design a upload portal for internal users"
      },
      {
        name: "Round - 4(30 Min)",
        content: "Related to parking lot : focuced on how to calculate price efficiently on prices calculation if we have different pricing strategy on weekdays and weekends. Also based on week hour (9am-5am)\nThis is the round that got me rejected - Interviewer was weird didnt respond very well whenever i was asking clarifying question"
      }
    ]
  },
  {
    id: 8,
    role: "Associate Role | Transaction Banking | Bangalore",
    yoe: "3 yrs",
    date: "Sep 17, 2025",
    author: "Anonymous User",
    rounds: [
      {
        name: "Background",
        content: "Current Company - Service Based\nCurrent Compensation - 8 LPA\nYOE - 3 yrs\nI applied directly on their portal and recruiter reached out to me and shared a test link which was on HackerRank."
      },
      {
        name: "1st Round - OA",
        content: "There were 2 Medium questions in this test."
      },
      {
        name: "2nd Round - Coding(Codepad)",
        content: "Interviewer came up with 2 questions\nFirst unique character in a string\nFind the integer in rotated sorted order.\nInterviewer expected the most optimal code and I was able to solve both and all the test cases were passing. It was over within 30 minutes.\nSelected for next round. Recruiter told me he will schedule next interview within 1 week.\nAfter a week I had Super Day. Three rounds in a day."
      },
      {
        name: "SuperDay Round 1 (DSA)",
        content: "Here there were 2 interviewers both asked 1 question\nDesign a Data Structure to update, return and change all the values. All the method should be in O(1) time complexity.\nGiven an array and k value you can only take values either from front or back. Output the maximum sum.\nI was able to partially solve first but completed 2nd with all test case passed."
      },
      {
        name: "SuperDay Round 2 (Low Level Design)",
        content: "Here they started with project questions then moved to discussion on NoSQL and SQL. Then asked to design restaurent's most frequent ordered items. Then they asked java question why static keyword, garbage collector, multithreading."
      },
      {
        name: "SuperDay Round 3 (High Level Design)",
        content: "Design a monitoring tool.\nI was not able to answer in this round as my second round didn't went well and in this round I was not able to tell anything."
      },
      {
        name: "Verdict",
        content: "Verdict - Rejected."
      }
    ]
  },
  {
    id: 9,
    role: "Associate - Compliance Engineering",
    yoe: "4 YoE",
    date: "July 2025",
    author: "Anonymous User",
    rounds: [
      {
        name: "Background",
        content: "4 YoE, India\nRecruiter reached out from Naukri\nTeam: Compliance Engineering"
      },
      {
        name: "Structure",
        content: "Screening: HackerRank OA (2 hr)\\nRound 0: CoderPad Interview (1 hr)\\nSuperDay Rounds (Onsite Loop)\\nRounds 1, 2 & 3 are loop interviews to be scheduled on the same day.\\nRound 1: Data Structures (1 hr)\\nRound 2: Software Engineering Practices/ DSA (1 hr)\\nRound 3: Software Design and Architecture (1 hr)\\nRound 4: Hiring Manager Round"
      },
      {
        name: "Screening: HackerRank OA (2 hr)",
        content: "Completed in 15–20 mins, Easy questions"
      },
      {
        name: "Round 0: CoderPad Interview (1 hr)",
        content: "Q1: First Unique Character in a String\nLeetCode Easy: https://leetcode.com/problems/first-unique-character-in-a-string/description/\nChosen Approach: Two-Pass Fixed-Size Frequency Array; O(N)\nQ2: Trapping Rain Water\nLeetcode Hard: https://leetcode.com/problems/trapping-rain-water/description/\nChosen Approach: Two-pointer scan from both ends, updating bounds and accumulating water.\nCoded the most optimal solution for both with test cases passed."
      },
      {
        name: "SuperDay Round 1: Data Structures (1 hr)",
        content: "Q1: Reverse Single-Linked-List in k-Groups\nLeetCode Hard: https://leetcode.com/problems/reverse-nodes-in-k-group/\nQ2: Longest Increasing Subsequence\nLeetCode Medium: https://leetcode.com/problems/longest-increasing-subsequence/description/"
      },
      {
        name: "SuperDay Round 2: Software Engineering Practices or DSA (1 hr)",
        content: "Q1: Shortest Path with K Hops/ Free Edges\nLeetCode Hard: https://leetcode.com/problems/find-shortest-path-with-k-hops/description/\nCould only code Q1 in 1 hr, so not proceeded to Round 3"
      },
      {
        name: "Verdict",
        content: "Verdict: Rejected after SuperDay Round 2"
      }
    ]
  },
  {
    id: 10,
    role: "Analyst - Compliance Analyst",
    yoe: "2yrs",
    date: "Aug 31, 2025",
    author: "Anonymous User",
    rounds: [
      {
        name: "Application",
        content: "I applied via referral and received an OA link after few days"
      },
      {
        name: "Round 1 - Online Assessment",
        content: "Q1 - A question from stack which involved removing substrings if a same character is appearing more than or equal to k times\nQ2 - A queue based question (simulated what was given in problem statement)"
      },
      {
        name: "Round 2 - Coderpad",
        content: "Q1 - Standard Grid DP\nQ2 - Given N Sorted Arrays , Merge them in sorted fashion"
      },
      {
        name: "Superday - Round 3 - Data Structures",
        content: "There were three rounds which was conducted on same day\\nQ1 - Given an sorted integer array and a number k , in each operation we can take some portion from k and add it to any number in the given array\\nThis can be done till k is greater than or equal to 0. We need to maximize the frequency of any number using optimal operation\\nEx [1,3,5,8,10,11,12] k = 3 , Answer is 3 since we can increment 11 1 time and 10 2 times , hence 12 is repeated for 3 times\\nGave brute force , binary search and sliding window solution\\nQ2 - Standard DP on stocks"
      },
      {
        name: "Round 4 - Software Engineering Practices",
        content: "Q1 - Problem involved finding shortest paths on exchanges , included negative costs too , discussed limitations on dijkstra , explained bellman ford and floyd warshall\\nQ2 - Standard Sliding window problem\\nhttps://leetcode.com/problems/fruit-into-baskets/description/"
      },
      {
        name: "Round 5 - Software Design and Architecture",
        content: "Started with my current project , discussions around Kafka.\\nThen a problem statement similar to Design Twitter\\nExplained FR , NFR , API , Entities, HLD (Load balancers, Microservices, Cache, CDN, Async Processing , S3 , DynamoDB, Fan out services)\\nIt was a good discussion , learnt a lot on that\\nAfter an hour got a call from HR , she mentioned I need to go to Office for my Hiring Manager Round"
      },
      {
        name: "Round 6 - Hiring Manager Round",
        content: "Lot of behavioural questions\\nWaiting for the result ...\\nThis role is for Compliance Analyst"
      }
    ]
  },
  {
    id: 11,
    role: "Summer Analyst 2026",
    yoe: "N/A",
    date: "Aug 01, 2025",
    author: "Pukhraj Motwani",
    rounds: [
      {
        name: "🟢 Round 1 – Technical + HR Blend",
        content: "This was my first-ever interview, and I was honestly nervous. But the interviewer made me feel at ease from the start.\n❓ Question: Tell me something that's not in your resume\nI spoke about my role as the Technical Head at QCM, where we manage the club's website, conduct quizzes, and handle role-based access. This led to a long technical discussion.\n💬 We discussed:\nHow we store quiz data\nUse of Apprite as BaaS\nRole-Based Access (RBA)\nHow quizzes are conducted through our platform\n🧠 DSA Question:\nGiven two strings A and B, find the minimum length substring of A that contains all characters of B (order doesn't matter).\nMy Approach:\nStarted with a brute-force O(n²) solution and wrote the code\nThen optimized it using two-pointer sliding window, explained the logic clearly\nThe interviewer was happy with the explanation — no need to write the optimized code\nWe ended with a few HR questions like:\nTell me about a time you faced conflict in a team\nHow did you resolve it?"
      },
      {
        name: "🔵 Round 2 – Core DSA Problem",
        content: "This round focused purely on DSA.\n❓ DSA Question:\nGiven a grid with a start and an end cell. Each cell has some coins. Find a path from start to end such that maximum coins are collected.\n💡 My Approach:\nProposed a DFS solution\nInterviewer asked: 'Why not BFS?'\nExplained that BFS is suitable for shortest path/minimum-based problems, but for maximization, DFS helps explore all possibilities\nDiscussed time complexity: exponential due to recursion\nThen I proposed DP with memoization to optimize the solution\n💻 Coding:\nWrote a clean recursive + DP solution with minimal bugs\nInterviewer was impressed with my clarity and approach"
      },
      {
        name: "🟡 Round 3 – HR + Analytical + Tech",
        content: "Though it was the HR round, it included some technical discussion too.\nTopics Covered:\nDeep dive into my Walmart Sparkathon project\nAsked what improvements I would make if I rebuilt it from scratch with experience\n❓ Unexpected Twist:\nGave me a problem without specifying how to solve it\nI solved it using a DSA approach, which he appreciated\nThen he asked me to solve the same using MySQL\nI struggled at first, but after some hints and back-and-forth, I managed to solve it\nHe was satisfied with my willingness to learn and adapt\nHR Questions:\nWhy should we hire you?\nWhy is Goldman Sachs important to you?"
      },
      {
        name: "✅ Final Verdict: Selected",
        content: "All three interviewers were chill, engaging, and helpful. They weren't just testing coding skills — they were observing my communication, approach, and mindset."
      },
      {
        name: "💭 Final Thoughts",
        content: "An interview isn't just about getting the correct answer.\nPeople often treat interviews as one-way evaluations, but they're actually conversations.\nIf you're solving a problem:\nSpeak your thoughts aloud\nKeep the interviewer in the loop\nAsk for hints if you're stuck — don't let ego stop you\nInterviewers are not there to trap you — they're there to understand your approach and help you succeed.\nFeel free to reach out if you're preparing for GS or any similar SDE interviews. Happy to help! 😊"
      }
    ]
  },
  {
    id: 12,
    role: "Associate, India",
    yoe: "N/A",
    date: "Jun 25, 2025",
    author: "Anonymous User",
    rounds: [
      {
        name: "Background",
        content: "Gave hackerrank test around 1 month ago.\nAfter a week, got a call for coderpad screening round, after multiple rescheduling it got scheduled on 10th june.\n1st question for coderpad round was 153. Find Minimum in Rotated Sorted Array and second was 42. Trapping Rain Water (the must do problem for GS) solved both of them correctly along with edge cases.\nAfter two weeks got call from HR that coderpad round feedback was positive so they scheduled superday for 25th june.\nEach of the below rounds had two interviewers asking 1-1 ques each."
      },
      {
        name: "Round-1 (DSA)",
        content: "Round-1 consisted of two dsa questions, in the first question you have to design a Music Player Shuffler, You will be given a list of n songs and you have to select the next song to be played 'Randomly'\nConstraint - the next song selected should not be one of the last 'k' played songs. I was able to come up with multiple approaches but couldn't optimise it properly, required multiple hints\nSecond question was a variation of 496. Next Greater Element I\nI was able to come up with optimal approach quickly and coded it correctly.\nFor both of the questions, they had multiple questions on choice of data structures and time complexity, SC optimisation so be prepared for that."
      },
      {
        name: "Round-2 (Software Engineering Practices and SDLC)",
        content: "Round-2 was supposed to be software engineering practises and SDLC round, but instead had one DSA question and one design, dsa q was based on binary tree and its node value was in form of a coin value(positive or zero). And we needed to make each element of that tree to be 1 at the end. And return the total number of moves required for the optimal approach. Seemed like a leetcode hard level problem, but was able to come up with working solution correctly. I beleive they deliberately tried to give a vague prob statement to check whether the candidate is able to figure out the requirements or not.\nSecond question was based on HLD plus LLD of designing twitter with some constraints, I was able to explain the high level design aspects along with use of CDN, caching( write through depending on use cases), and other concepts really well. For LLD i listed the various entities required along with the classes, but kind of messed up in the db schema part and the relationships."
      },
      {
        name: "Verdict",
        content: "Verdict: Got rejection mail one hr after 2nd round.\nThe reason for rejection I can think can be the low level implementation of designing twitter since he was more inclined towards LLD compared to HLD.\nlet me know in the comments, the reasons you think for the rejection."
      }
    ]
  },
  {
    id: 13,
    role: "Analyst",
    yoe: "N/A",
    date: "Jun 30, 2025",
    author: "Anonymous User",
    rounds: [
      {
        name: "Application",
        content: "I applied through referral on GS portal and recieved an online assesment link after few days."
      },
      {
        name: "Round 1 - Online Assesment",
        content: "Q1 - Decode ways\\nQ2 - Given a range of numbers [l, r] and an integer q. The task is to count all such number in the given range such that any digit of the number does not match with any digit in its product with the given number q.\\nI completed both the questions and got an email asking for my details and that interview will be scheduled soon."
      },
      {
        name: "Round 2 - Coderpad",
        content: "Got a call from HR, 2 months after the OA for scheduling interview.\\nQ1 -Trapping rainwater disguised as compute snowpac.\\nQ2. The question asked was about a bishop on an 8x8 chessboard. I was given the starting and target coordinates and had to find the minimum number of moves for the bishop to reach the target. If it was impossible, I needed to return -1.\\nSince I completed both the questions with optimal implementation and edge cases, interviewer asked me a third debugging question.\\nQ3 - Given a program to find number of characters (including spaces) between the given positions of two words. Debug the program so that it works for all the given test cases.\\nInterviewer gave around 5 test cases on which the program was failing. I was able to find three bugs and interviewer wrapped it up"
      },
      {
        name: "Super day - Round 3 - DSA (Mandatory)",
        content: "From here on every round had a panel of two interviewers interviewing.\\nFirst interviewer asked first two DSA questions.\\nQ1. Min Stack - A variation of this question was asked where I had to implement max stack instead of min.\\nQ2. Number of Islands - A slight variation of this question was asked.\\nSecond interviewer joined a little late and started with resume grilling and asked lots of question on project in current company.\\nQ3. Max path sum -A variation of this question was asked where we could make only diagonal and downwards movement."
      },
      {
        name: "Round 4 - Software engineering principles (Mandatory)",
        content: "Q1. Given a logger class and three functions -\\na - startTime function with startTime and process id as parameters.\\nb - endTime function with endTime and process id as parameters.\\nc - print function - Prints all the completed process whenever invoked in ascending order of start time.\\nThe program works as a stream class with continuous inputs being fed to it.\\nQ2. Convert integer to words - A variation of this question was asked where in the conversion has to be in Indian format instead of International.\\nQ3. Decode ways\\nQ4. Design a distributed cache system and some questions on scalability, load balancing, etc were asked.\\nQ5. Some basic questions revolving around performance improvement in the cache system were also asked towards the end of the interview.\\nWemt very well and was able to answer all the questions."
      },
      {
        name: "Round 5 - Design and Architecture",
        content: "Q1. SQL query to find all employees whose salary is greater than their manager.\\nQ2. Predict the winner - Was asked to print the path of each of the players as well.\\nQ3. Find shortest distance from bottom left vertex to upper right vertex of a cube.\\nOne of the interviewers did not join this round, so I had design round again next day."
      },
      {
        name: "Round 6 - Design and Architecture",
        content: "Q1. Design LLD for BookMyShow (with full implementation).\\nQ2. How will you scale the system in case of increased traffic load?\\nQ3. Design LLD for rate limiter.\\nQ4. How will you handle a situation in a rate limiter where the window has space for just one request and multiple requests come at once from same user through different devices."
      },
      {
        name: "Round 7 - Hiring Manager",
        content: "Q1. Why are you looking for switch so early\\nQ2. Why GS\\nQ3. Couple of behavioural questions."
      },
      {
        name: "Verdict",
        content: "Verdict - Selected"
      }
    ]
  },
  {
    id: 14,
    role: "Associate",
    yoe: "3 years",
    date: "Jul 08, 2025",
    author: "Anonymous User",
    rounds: [
      {
        name: "Background",
        content: "I'm presently working at a good product-based company and have almost 3 years of experience."
      },
      {
        name: "Round 1 : OA (2 hr)",
        content: "It consisted to 3 leetcode medium level questions. Couldn't remember exact questions."
      },
      {
        name: "Round 2 : CoderPad Interview (1 hr)",
        content: "Question 1: It was a medium-level question involving hashmaps, but I couldn't find the exact one on LeetCode.\\nQuestion 2: https://leetcode.com/problems/minimum-path-sum/description/"
      },
      {
        name: "Round 3 : Data Structures (1 hr)",
        content: "Rounds 3, 4 & 5 are kind of loop interviews scheduled on the same day.\\nQuestion 1: https://leetcode.com/problems/find-original-array-from-doubled-array/description/\\nQuestion 2: https://leetcode.com/problems/magnetic-force-between-two-balls/description/\\nImmediately after Round 3, I received an email stating that the remaining rounds had been cancelled. When I reached out to the HR, she mentioned that the feedback from Round 3 was very poor."
      },
      {
        name: "Just FYI",
        content: "Round 4 is Software Engineering Practices (1 hr)\\nRound 5 is Software Design and Architecture (1 hr)\\nRound 6 is Hiring Manager Round\\nGood luck to all!"
      }
    ]
  },
  {
    id: 15,
    role: "Associate (Software Engineer) - Dallas, TX",
    yoe: "3 years fintech exp",
    date: "Jul 25, 2025",
    author: "Anonymous User",
    rounds: [
      {
        name: "Position Details",
        content: "Position - Associate (Software Engineer)\\nLocation - Dallas, TX\\nStatus - F1 student (May 25 graduate), 3 years fintech exp"
      },
      {
        name: "Application Timeline",
        content: "Apr 27: Applied via careers portal\\nMay 28: Email requesting availability for CoderPad screening\\nJun 06: Round 1 – CoderPad\\nJun 17: Advanced to virtual panel interview\\nJul 09: Virtual panel (3 rounds)\\nJul 10: Advanced to hiring‑manager interview\\nJul 11: Hiring‑manager round\\nJul 18: HR call (compensation and basic info)\\nJul 21: Preliminary immigration call with Fragomen\\nJul 24: HCM call — verbal offer, written offer received an hour later"
      },
      {
        name: "Round 1 — CoderPad (60 min)",
        content: "All leetcode questions were GS tagged questions\\n10–15 min: introductions and resume deep‑dive\\nCoding:\\nMedium — BFS/DFS\\nHard — two‑pointer\\nFully working code with test cases required"
      },
      {
        name: "Virtual On‑Site - Data Structures (60 min)",
        content: "Low‑level design; LeetCode‑style medium design problem"
      },
      {
        name: "Virtual On‑Site - Software Engineering Practices (60 min)",
        content: "40 min resume discussion\\nMedium binary‑search question (coded during remaining time)"
      },
      {
        name: "Virtual On‑Site - System Design & Architecture (60 min)",
        content: "System design — design a platform like LeetCode (more open-ended)"
      },
      {
        name: "Hiring Manager Round",
        content: "Scheduled for 30 min but lasted over an hour\\nPurely behavioral questions\\nSecond half was mainly about the team and day-to-day activities"
      },
      {
        name: "Verdict",
        content: "Offer Accepted\\nHope this helps anyone on a similar journey — good luck and happy grinding!\\nPS: I did use ChatGPT to refine the post."
      }
    ]
  },
  {
    id: 16,
    role: "Associate",
    yoe: "3 year+",
    date: "Nov 30, 2024",
    author: "Anonymous User",
    rounds: [
      {
        name: "Background",
        content: "Current Experience: 3 year+ at a product based finance MNC\\nRecently i appeared for Goldman sachs associate role. Recruiter reach out to me.\\nThere were total of four rounds for me."
      },
      {
        name: "OA round: Hackerrank",
        content: "Two easy to medium level question was there on hackerrank platform. Time was 2 hour but was able to solve both questions much before that."
      },
      {
        name: "First round: Coderpad",
        content: "It was one hour round. It started with introduction then asked two coding questions in below sequence.\\nIn this round they were supposed to ask one medium-hard and one medium DSA questions.\\nhttps://leetcode.com/problems/target-sum/description/. I gave brute force exponential solution then did top down dp to make it O(nsum) but then interviewer was expecting more optimizated solution which i could not. Coded O(nsum) because of time contraint.\\nVariation of this https://leetcode.com/problems/remove-one-element-to-make-the-array-strictly-increasing/description/ where instead of one element we can delete one subarray. Just discussed the approach because we did not left with time to code."
      },
      {
        name: "Superday Note",
        content: "Superday interviews I gave superday in fever because I only had 1 month notice period left and i heard GS take around a month to release offer letter so i did not reschedule. I felt I lacked concentration a bit in interview because of fever. Idk it was my bad decision or god plan. So be mindful in choosing superday."
      },
      {
        name: "Second round: Data structures",
        content: "It was one hour round. A Panel of two interviewers were there. They started with introduction.\\nThen they asked two coding questions in sequence:\\nGiven map<child,parent> representing graph edges, find root of tree having maximum number of nodes. I gave Time O(E) and Space O(min(V,E)) solution but she was expecting more optimization and said will discuss later but in interest of time I coded O(E) solution but i did mistake to return maximum number of nodes instead of root of that which she pointed in the interview end.\\nhttps://leetcode.com/problems/sliding-window-maximum/description/ This was known question to me I gave brute force O(n*k) solution and later optimized it to O(n) with sliding window approach. But struggled a bit while running and debugging. Second interviewer was friendly and gave couple of extra minutes and i was able to run the code successfully."
      },
      {
        name: "Third round: Software engineering practice",
        content: "It was one hour round. A Panel of two interviewers were there. It started with introduction from both sides.\\nThen they asked following in sequence:\\nGiven an array, return true if there exists a triple of indices (i, j, k) such that i < j < k and nums[i] < nums[k] < nums[j] otherwise return false. I started with brute force O(n^3) then gave O(n^2) solution but he expected more optimization which i could not. I coded the O(n^2) solution but he ran the code in the end of interview and it failed because of one negligible check which i pointed, he seems statisfied.\\nSecond interviewer was very experienced, he asked known SnakeLadder LLD, I wrote few classes and also wrote code logic for play, he was almost statisfied but he said it wont work in distributed enrviroment and he was expecting the logic in event way that one event should trigger another event which i could not get. I should have ask in the end what he is expecting exactly but i did not ask thinking it may go other way round."
      },
      {
        name: "Verdict",
        content: "There were two more rounds namely Software Design and Architecture and Hiring Manager Round but I got rejected after Software engineering practice which i did not expect.\\nBadest part is I didn't get feedback I tried getting feedback over email but did not get response, also i tried calling hr but calls are getting rejected.\\nHope it will help others. All the best champs."
      },
      {
        name: "SnakeLadder LLD Discussion",
        content: "Let me know how SnakeLadder LLD can be done in events so that it will work in distributed environment. Below logic I gave of course without logs: [Code snippet showing game logic with player queue, dice rolling, and winner determination]. Note: One solution which is coming in my mind is may be we can use something like choreography design pattern where we will put one event on one kafka topic(or any other message broker) from where next service can pick, process and put next event on other kafka topic next service is listening to. May be we use library like KStream for this usecase. We can achieve same with one kafka topic as well, segregating different event based on kafka header. During interview i could not think of distributing this small code piece."
      }
    ]
  },
  {
    id: 17,
    role: "Associate",
    yoe: "2.10 YOE",
    date: "Jun 26, 2025",
    author: "Anonymous User",
    rounds: [
      {
        name: "Background",
        content: "YOE : 2.10 YOE\\nCurrent Org : Fintech (India)"
      },
      {
        name: "Round 1: OA - Hackerrank",
        content: "2 DSA questions don't remember but were easy"
      },
      {
        name: "Round 2 DSA",
        content: "Find the length of a cycle in an array numbers are from 1-N\\nRain water trapping (leetcode)\\nSelf verdict -> Strong"
      },
      {
        name: "Superday - Round 1",
        content: "Course schedule II (Leetcode)\nComplete function getRandomNum generate number from 0 -> target in random fashion you can use function getRandomDigits\npublic int getRandomDigits(); //0-9\npublic int getRandomNum(int target) { ... }\n\nSelf verdict -> Strong"
      },
      {
        name: "Superday - Round 2",
        content: "You are a shopping and discount enthusiat. You go to a mall and there each shop has a certain amount of coupon at each shop. you want to colect as much coupns as you can and the only constraint stopping you from getting all of them is that adjacent shop have security systems connected. If two adjacent shops are visited for coupn then the security system will alert the security and you get nothing.\\nGiven an array nums where nums[i] represents the amount of coupon in the i-th shop, return the maximum amount of coupon you can collect without alerting the security.\\nCreate a data structure which provide below functionality\\nInsert, Deletion and getRandom all in O(1) time complexity\\ndelete by key data order doesn't matter\\nInsert by data\\ndelete by data\\nget random from existing data\\n\\nSelf verdict -> Strong\\nCatch -> For shopping question the interviewer didn't knew DSA was not believing my solution in O(N)\\nFor custom data structure interview helped alot"
      },
      {
        name: "Moral & Verdict",
        content: "Moral -> After all this just last round just last question messed it all\\nHope this helps someone\\n\\nI have two request\\nDo you guys think i am rejected just because of last question even though i solved it with help\\nCan you tell the T.C as interview doesn't think it is O(N) (code is in the comment)"
      }
    ]
  },
  {
    id: 18,
    role: "Analyst",
    yoe: "2 YOE",
    date: "Jul 09, 2025",
    author: "Anonymous User",
    rounds: [
      {
        name: "Current Profile",
        content: "Company: Competing Investment Bank\\nBase: 15.2 LPA\\nAnnual Bonus: 2.5 L\\nRetention: 3 L\\n\\nRecruiter Reachout on linkedin - Asked for Java specifically and all rounds to be held in java"
      },
      {
        name: "R1 - OA (28 March 2025)",
        content: "2 DSA Questions\\nClassic 1-0 Knapsack - Medium\\nBinary Search Question - Medium"
      },
      {
        name: "R2 - Coderpad (28 April, 2025)",
        content: "Basic Array Average Question - Easy\\nString Manipulation - Easy"
      },
      {
        name: "R3 - Algorithms and Java Discussion (In Person)",
        content: "Hashmap Internals\\nJava Deep Dive\\nTime Complexities"
      },
      {
        name: "R4 - System Design (In Person)",
        content: "Resume Deep Dive - Kafka, Cloud\\nNotification Sending System: Multiple User Groups, Multiple Transports\\nMultithreading Deep Dives"
      },
      {
        name: "R5 - Techno-Managerial",
        content: "Resume Deep Dive\\nDSA - Find Kth largest number in a Stream"
      },
      {
        name: "H6 - Hiring Manager Round",
        content: "Normal Behavioural Questions\\nGot the Offer after a long long wait"
      },
      {
        name: "Offer",
        content: "Offer: https://leetcode.com/discuss/post/6938216/goldman-sachs-analyst2yoe-comp-bangalore-13ky/"
      }
    ]
  },
  {
    id: 19,
    role: "Associate",
    yoe: "N/A",
    date: "Jun 28, 2025",
    author: "Anonymous User",
    rounds: [
      {
        name: "Background",
        content: "I applied directly on the GS career portal. The job title was \"Global Banking & Markets - Eq GSET Platform - Associate - Bengaluru\". I received a HackerRank test link after 8 days, which the recruiter had mentioned needed to be completed within 24 hours in the email. There were a total of 5 rounds. A peculiar thing to note was that all communications (OA/Interviews) were sent by email and not by any phone calls."
      },
      {
        name: "Online Assessment (120 minutes)",
        content: "Non-repeating digit in product - GFG Count numbers in range such that digits in it and it's product with q are unequal\\nCoding Wars - LC 1395. Count Number of Teams\\n\\nI got an email the next day stating that I cleared the test and they are moving my candidature ahead for the next level of interview processes. They also asked for some basic details and mentioned that the opportunity is a complete WFO. After 8 days, I received an email to provide my next 2 weeks availability for the CoderPad round."
      },
      {
        name: "CoderPad Interview Round (60 minutes)",
        content: "The interviewer began with the introduction and mentioned that he was among the sister teams for whom they were hiring. The coderpad was initially set up for the Java language, although in the email, I had mentioned C++ as my preferred language. Upon request, the interviewer allowed me to use C++ and mentioned that for the upcoming rounds to use Java. The interviewer was engaging and helpful.\\n\\nApache log file contains a list of IP addresses. Find the IP address with the highest frequency. If multiple IP addresses tie for the highest frequency, then return the values in a comma-separated format.\\n\\nAnalogous to LC 42. Trapping Rain Water (given as snow instead of rain).\\n\\nFor the trapping rain water problem, I initially gave the O(N) space approach, and since there was time remaining, he asked me to optimise and then gave the two-pointer approach, but could not complete the coding. The interviewer said that I was on the right track for the optimal solution, just had to consider a few edge cases and mentioned that he was anyway happy with the previous approach.\\n\\nNote: By this time, all those who are preparing for GS Interviews would know that the Trapping Rainwater problem is one of Goldman Sachs' all-time favourite problems, so make sure to practice and be familiar with all approaches (brute, better, and optimal).\\n\\nOverall, I was satisfied with my performance and hoped to receive a call for Superday. Soon, I got an email within 45 minutes post-interview asking about my availability for the next rounds, and I gave my preference for next week."
      },
      {
        name: "Panel Interview - Round 1 - DSA (60 minutes)",
        content: "I was expecting all 3 interviews to happen the same day. However got the invite to Panel Interview for Round 1 and 2 back-to-back on the same day. They also mentioned that each interview is an eliminatory round. It was supposed to be 1 week later, but unfortunately, I fell sick, so it had to be pushed further 1 more week. One thing I liked very much about GS is their flexibility to schedule interviews based on the candidate's availability. My preparation for the next rounds was from the past 3 months Goldman Sachs interview experience found on the Leetcode Discuss section.\\n\\nThis round was taken by 2 VPs. Began with introductions, and the first interviewer gave a problem with very little context. You are given a list of cities and a function/API boolean isDirectConnected(c1, c2). Implement boolean isConnected(c1, c2). While coding, I had to ask follow-ups, and both interviewers were helpful enough to provide hints if I was stuck anywhere. I took around 40 minutes, including recognising it was a graph + DFS problem and writing pseudocode, as the interviewers also stopped me in between asking some why/hows on the code. Later, the interviewer mentioned that the graph could be bi-directional, and I had forgotten initially to keep a visited array, so I had fixed that too.\\n\\nThe second interviewer then asked a question that if we have 1B numbers and want to find the top 1M numbers, which data structure would you use and what would be the time complexity of it? I told that we would use a min-heap and the T.C. would be O(NLogK). However, the interviewer had a slightly different opinion around the TC, and the interview was wrapped up by me asking a question on the GBM team."
      },
      {
        name: "Verdict - Rejected",
        content: "I felt that the interview went good and was honestly preparing to appear for the 'Software Engineering Practices' round. However, I was a bit shocked to receive the rejection mail 10 minutes after the interview. I am not sure how I have messed up, perhaps taking hints to solve. All I know is that I could not have done much better, although I could be more confident. Maybe it's god's plan, anyway, back to square 1!"
      }
    ]
  },
  {
    id: 20,
    role: "Analyst",
    yoe: "1.10 Years",
    date: "Jun 12, 2025",
    author: "Anonymous User",
    rounds: [
      {
        name: "Background",
        content: "Current Experience: 1.10 Years\\nCollege: Tier-2\\nPrevious Organization: One of the MNCs\\n\\nOne Employee referred me."
      },
      {
        name: "OA",
        content: "Online Assessment completed"
      },
      {
        name: "Coder pad round",
        content: "1st questions -\\nReturn an array containing prime numbers whose product is x\\nExamples:\\nprimeFactorization( 6 ) == [2,3]\\nprimeFactorization( 5 ) == [5]\\nprimeFactorization( 12 ) == [2,2,3]\\n\\n2nd question -\\nGiven an array of non-negative integers representing the elevations\\nfrom the vertical cross section of a range of hills, determine how\\nmany units of snow could be captured between the hills.\\n\\nSee the example array and elevation map below.\\n                            ___\\n        ___                |   |        ___\\n       |   |        ___    |   |___    |   |\\n    ___|   |    ___|   |   |   |   |   |   |\\n___|___|___|___|___|___|___|___|___|___|___|___\\n[0,  1,  3,  0,  1,  2,  0,  4,  2,  0,  3,  0]\\n                            ___\\n        ___                |   |        ___\\n       |   | *   *  _*_  * |   |_*_  * |   |\\n    ___|   | *  _*_|   | * |   |   | * |   |\\n___|___|___|_*_|___|___|_*_|___|___|_*_|___|___\\n[0,  1,  3,  0,  1,  2,  0,  4,  2,  0,  3,  0]\\n\\nSolution: In this example 13 units of snow (*) could be captured.\\n2) Implement computeSnowpack() correctly.\\n3) Consider adding some additional tests in doTestsPass().\\ntrapping rain water question basically."
      },
      {
        name: "Super day - 1st round",
        content: "https://leetcode.com/problems/car-pooling/description/\\nhttps://leetcode.com/problems/find-the-winner-of-the-circular-game/description/"
      },
      {
        name: "Super day - 2nd round",
        content: "https://leetcode.com/problems/rotting-oranges/description/\\nhttps://leetcode.com/problems/single-threaded-cpu/description/"
      },
      {
        name: "Super day - 3rd round",
        content: "DSA - Everytime somebody comes to the website, we write a record to a log file consisting of TimeStamp, PageId, CustomerId. At the end of the day we have a big log file with many entires in that format. And for every day we have a new file.\\nNow, given two log files (from day 1 and day 2), we want to generate a list of loyal customers that meet the criteria of\\na) they came on both days, and\\nb) they visited at least two unique pages\\n\\nsingleton class implementation\\nAbstract vs interface. When we prefer abstract class\\nArrayList/linked list\\nWhen we prefer array list and linked list\\nStatic\\nProcess vs thread\\nDesign pattern used\\nSingleton class\\nCi/cd process\\nHow Build process happen\\nUnit testing.. Which library? Write Unit testing for a class for database connection.\\nWhich java version and it's features"
      },
      {
        name: "HM round",
        content: "Discussion on projects on resume.\\nSdlc process\\nStandard behavioral questions\\nWhy leave current company?\\nWhy GS?\\nSituation based questions like\\n\\nIf an important client want some information about the other competitors. Then what you will do in this situation?\\nIf your colleague work in remote location and sent you the completed work. But the work is not relevant to the project than what you will do in this situation?"
      },
      {
        name: "Verdict",
        content: "Selected ✅"
      }
    ]
  },
  {
    id: 21,
    role: "Associate (SDE2)",
    yoe: "4 YOE",
    date: "Jun 13, 2025",
    author: "Anonymous User",
    rounds: [
      {
        name: "Background",
        content: "YOE: 4\\nI applied to Goldman Sachs through a referral from a friend on March 11."
      },
      {
        name: "🔹 Round 1 – DSA (Hackerrank Online Test)",
        content: "I received a Hackerrank test link on March 31 which included 1 easy and 1 medium-level DSA problem.\\n✅ Went very well."
      },
      {
        name: "🔹 Round 2 – DSA (CoderPad Interview on April 15)",
        content: "This round focused primarily on DSA. I was asked one medium-level coding question along with a few questions about my projects, Java, and Spring Boot.\\n✅ Went very well."
      },
      {
        name: "🔹 Super Day – April 28",
        content: "There were four interviews scheduled back-to-back with different focus areas:"
      },
      {
        name: "🔸 Round 3 – DSA",
        content: "This round involved solving one medium-level problem end-to-end with code and test cases, and discussing the approach (not code) for another algorithmic problem. I wrapped up by asking the panel about the challenges they were currently working on.\\n✅ Went very well."
      },
      {
        name: "🔸 Round 4 – Software Engineering Practices",
        content: "This round was all about core engineering principles—deep dives into Java, Spring Boot, SQL & NoSQL, design patterns, ACID properties, code reviews, and project discussions. I was also asked to demonstrate a service violating the Single Responsibility Principle and then refactor it correctly.\\n✅ Went very well."
      },
      {
        name: "🔸 Round 5 – System Design & Architecture",
        content: "It started with a deep discussion on my current project, followed by designing a high-level architecture for an e-commerce platform.\\n✅ Went very well."
      },
      {
        name: "🔹 Round 6 – Hiring Manager Round",
        content: "This round began with my career journey, followed by a behavioral question which I answered well. However, I was asked three aptitude questions and couldn't solve any of them.\\n➖ Went average."
      },
      {
        name: "Final Verdict",
        content: "📩 On May 21, I received the final result—and I'm happy to share that I got the offer!\\n✅ SELECTED"
      }
    ]
  },
  {
    id: 22,
    role: "Analyst",
    yoe: "1.5 YOE",
    date: "Mar 01, 2025",
    author: "Anonymous User",
    rounds: [
      {
        name: "Background",
        content: "1.5 yrs experience at Indian fintech as backend java developer. Applied through referral."
      },
      {
        name: "Round 1 - Online Assessment",
        content: "Don't remember the questions but one was an easy question and second was leetcode medium level. Was able to solve both of them.\\nFew days later the recruiter reached out to me to take info regarding current CTC, notice period etc, and told that my profile is being forwarded for the rounds to be scheduled. Few days later got email to provide slot for coderpad."
      },
      {
        name: "Round 2 - Coderpad",
        content: "Q1: https://leetcode.com/problems/string-compression/description/\\nQ2: https://leetcode.com/problems/trapping-rain-water/description/\\nI explained the approach for the first problem and jumped into implementing it. For the second question, I discussed the extra space approach first and then explained the constant space approach and implemented it. I had to execute my code for some test cases. After that the interviewer added some more test cases. I had to handle some corner cases in the first problem in order to pass them.\\nNext working day recruiter called to select a date for superday. 3 interviews of 1 hr each with 30 mins gap in between."
      },
      {
        name: "Superday - Round 3 - Data Structures",
        content: "Two interviewers were present, one question asked by each of them.\\n\\nQ1: https://leetcode.com/problems/group-anagrams/description/\\nQ2: https://leetcode.com/problems/count-good-nodes-in-binary-tree/description/\\nAgain the expectation here was to produce an optimized working solution that should pass the test cases. For the second question, we did a dry run on some test cases. In between, the first interviewer asked a few questions on APIs and databases, like how will you fetch a large data (1GB) using REST APIs, etc."
      },
      {
        name: "Superday - Round 4 - Software Engineering Practices",
        content: "Questions on Interfaces in Java, Spring framework, etc.\\nDesign a Payment Gateway Service (LLD). Spent 45 mins here."
      },
      {
        name: "Superday - Round 5 - Software Design and Architecture",
        content: "Q1. Design a LRU cache.\\nQ2. Given a number like 1234, output it in words one thousand two hundred and thirty four.\\nTwo days later got a call to schedule another technical round."
      },
      {
        name: "Round 6 - Technical Round",
        content: "String == vs equals difference.\\nExplain string immutability.\\nHow can you make a class immutable?\\nSQL query problem that was solved using group and having clause\\nDesign the backend of a employee details form, was required to implement springboot features, controller, service and repository class, and also explain the APIs"
      },
      {
        name: "Round 7 - Hiring Manager",
        content: "It was a quick 20-25 mins call. The HM asked some questions like\\n\\nWhy I am leaving the current company at 1.5yrs only?\\nWhy GS?\\nHe explained about the team, tech stack, etc. In the end he concluded on a positive note stating that he wants me in the team as early as possible."
      },
      {
        name: "Verdict",
        content: "Selected as the HR confirmed verbally. Awaiting offer letter. ✅"
      }
    ]
  },
  {
    id: 23,
    role: "Analyst",
    yoe: "1.5 years",
    date: "Jun 19, 2025",
    author: "Jaya Vishwakarma",
    rounds: [
      {
        name: "Background",
        content: "I applied in January through a referral.\\nReceived HackerRank Assessment on 25th March"
      },
      {
        name: "HackerRank Coding Test",
        content: "It had 2 leetcode medium questions.\\nDon't remember the questions.\\n\\nReceived mail on 10th April that I cleared the round. But after that no communication.\\nReceived recruiter's call on 23rd May to schedule CoderPad Round.\\nGave CoderPad on 29th May."
      },
      {
        name: "CoderPad Round",
        content: "Asked 2 leetcode questions.\\n1 hard and 1 medium.\\n\\nTrapping Rain water\\nString question : aabbbbccd -> a2b4c2d1\\nTold brute force and optimal solution for both. Told the time and space complexity.\\n\\nAfter a week, received a call that I cleared this round and super day will be scheduled on 12th June."
      },
      {
        name: "SuperDay - Software Principles Round",
        content: "Every interview had two interviewers.\\n\\nIt had so many questions related to Java.\\nAsked questions related to my experience.\\nProjects\\nJava questions from basic to advance.\\nDesign Patterns like Singleton Pattern, Observer pattern etc.\\n\\nThis round went really well as I answered each and every question very nicely."
      },
      {
        name: "SuperDay - DataStructure Round",
        content: "It started with a general introduction and then asked about my experience.\\nThen indirectly asked me about some design patterns like observer design pattern, factory design pattern.\\n\\nThen he gave me a Coding question.\\n\\ngiven a 2d array, where each array[i] = [xi, yi, ai,bi].\\ncalculate the area covered by all these rectangles.\\nconstraint after finding the area .\\nI understood it and then told my approach how will I find the maximum area. Interviewer told that it will work.\\n\\nThen he added the following\\n\\nfind the min horizaontal line which will bisect this area into two equals halves.\\nI really did not understand what the question was all about. We discussed it about half an hour. But I think I was not getting close to the solution. Question was very vague. Time was gone and the second interviewer interrupted that we should move on.\\n\\nHe asked me one oops concept related implementation and the interview ended."
      },
      {
        name: "Results",
        content: "Rejected ❌\\n\\nLast round which was System Design Round was cancelled and I received rejection mail within one hour.\\n\\nPersonally I feel this question should not have been asked in the interview.\\n\\nFeel disheartened!\\n\\nAnyways, what are your thoughts?"
      }
    ]
  },
  {
    id: 24,
    role: "Analyst",
    yoe: "N/A",
    date: "May 06, 2025",
    author: "Anonymous User",
    rounds: [
      {
        name: "Introduction",
        content: "📌 My Interview Experience at Goldman Sachs – Analyst Position (April 2025)\n\nVerdict: Selected ✅\n\nHi everyone!\nI'm thrilled to share that I've been selected for the Analyst role at Goldman Sachs. I wanted to document my entire experience here in the hope it helps someone else preparing for the same."
      },
      {
        name: "🧠 Round 1 – CoderPad (April 4)",
        content: "This was a DSA-based live coding round. The level was easy to medium.\n\nQuestions:\n\nTrapping Rain Water\nDecode Ways\nI was able to complete both problems in 30 minutes. The interviewer asked a small follow-up (don't remember exactly, but it was easy).\n\nAfter that, we discussed my projects and work at my current firm.\n\n⏩ Got the call same day that I was selected for Super Day on April 8."
      },
      {
        name: "🧠 Round 2 – Super Day DSA Round (2 Interviewers)",
        content: "Both interviewers were super chill and encouraging!\n\nQ1: Tree-Based Problem\nI was given a binary tree and asked to print the diagonal traversal of it.\n\nExample:\n\n        1\n      /   \\\\\n     2     3\n    / \\\\   / \\\\\\\n   4   5 7   6\n\nExpected Output:\n1 2 4\n3 5 7\n6\n\nQ2: Stack & Queue Implementation\nDeep discussion on:\n\nImplementing stack using queue\nQueue using stack\nHandling operations with only one stack or one queue\nMany follow-ups but I was able to answer all."
      },
      {
        name: "🧠 Round 3 – Resume + LLD + DP",
        content: "Again two interviewers.\n\nResume Discussion\nSince I had mentioned Kafka and automation scripts, we had a detailed discussion on that.\n\nQ1: LLD – Task Scheduler\nDesign a task scheduler where tasks can only start after their dependencies are completed.\nFollow-up: Add priority-based execution.\n\nQ2: DP Problem\nVery similar to Predict The Winner\nFollow-up: Print the steps taken by the winner."
      },
      {
        name: "🧠 Round 4 – DSA + Logical Reasoning",
        content: "Q1: Burst Balloons\n\nQ2: Logical Array Problem\nGiven a sorted array:\n\nOriginal:    [1, 3, 5, 7, 10, 12, 14, 16]\nTransformed: [1, 7, 5, 3, 10, 16, 14, 12]\n             (Even indices unchanged; odd indices swapped randomly)\nQuestions:\n\nIs 5 present? If yes, at what index?\nIs 16 present? If yes, at what index?\nIs 11 present?\nWith hints from the interviewer, I was able to crack it.\nHonestly, couldn't solve this without hints, but the interviewers were really helpful."
      },
      {
        name: "🧠 Round 5 – HM Round",
        content: "The Hiring Manager was extremely friendly.\n\nWe discussed:\n\nWhy I'm looking to switch\nWhy Goldman Sachs\nSome situational and behavioral questions\nDiscussed CTC, location preference, etc."
      },
      {
        name: "💬 Final Thoughts & Verdict",
        content: "This was an extremely positive experience for me.\nEach interviewer was well-prepared, respectful, and genuinely curious.\nOne bad interviewer can ruin an interview process – but I had none here.\nFelt like a two-way conversation, not an interrogation.\n\n🎉 Verdict: SELECTED ✅\n\nI'm beyond grateful for this community – you all have helped me so much during preparation.\nFeel free to ask anything in the comments!"
      }
    ]
  },
  {
    id: 25,
    role: "Associate (US)",
    yoe: "N/A",
    date: "Jul 15, 2025",
    author: "Anonymous User",
    rounds: [
      {
        name: "✨ Interview Experience – Accepted Offer",
        content: "Application Source:\\nApplied on my behalf by applyjobsforme.com – they handled the job application process for me."
      },
      {
        name: "🧪 Round 1: Online Assessment",
        content: "The initial round was an online assessment consisting of 2 data structures and algorithms questions, both of which I successfully solved within the time limit.\\n\\nThe questions were of medium difficulty, and focused on core problem-solving ability.\\nThe platform tested for edge cases and optimality."
      },
      {
        name: "💻 Round 2: CoderPad Interview (Live Coding + Discussion)",
        content: "The interview began with a brief self-introduction and then moved into live coding via CoderPad. The interviewer was collaborative and encouraged thinking out loud.\\n\\n✅ Question 1 (Medium): Top Student Scores Averaging\\nProblem:\\nYou are given a list of [student_id, score] pairs. For each student, return the average of their top scores. If the top score is repeated, it should still be considered.\\nExample Input:\\n\\n[[1, 100], [1, 100], [1, 100], [2, 99]]\\nExpected Output:\\n\\n[[1, 100], [2, 99]]\\n\\n✅ Question 2 (Medium): Fraction to Recurring Decimal\\nProblem:\\nGiven a numerator and denominator, return the result as a string. If the fractional part is recurring, enclose the repeating part in parentheses.\\n\\nExamples:\\n\\n5/10 → 0.5, 1/3, 0.3 \\nI handled edge cases like negative numbers, zero numerators, and long recurring cycles.\\n\\n🎯 Behavioral Segment:\\nDiscussed motivation, past projects, and challenges overcome.\\nShared an example of working under pressure and taking initiative.\\n✅ Successfully cleared this round. Got a call back for the Superday after nearly 2 months of wait."
      },
      {
        name: "🔍 Round 3: Superday – Data Structures Focus",
        content: "Panel included two interviewers, each of whom asked one technical problem.\\n\\n✅ Question 1: Trapping Rain Water\\nA classic two-pointer problem to calculate the volume of water trapped after rainfall.\\n\\nDiscussed brute-force, prefix-max arrays, and optimized two-pointer approach.\\nEmphasized space optimization and in-place computation.\\n\\n✅ Question 2: Implement stoi (String to Integer)\\nRecreate the stoi function.\\n\\nHandled white spaces, sign, integer overflow, and invalid characters.\\nEdge cases like -42 \\nThe focus was on string parsing, input validation"
      },
      {
        name: "🛠️ Round 4: Superday – Software Engineering Practices",
        content: "Another panel of two interviewers, this time focused on system and product thinking.\\n\\n✅ Question: Low-Level Design of Google Calendar\\nDesigned a simplified version of Google Calendar with core functionalities:\\n\\nCreate, update, delete events.\\nHandle overlapping events.\\nNotification/reminder system.\\nScalability for millions of users.\\nDiscussed use of:\\n\\nData models (event schema, user calendar),\\nConcurrency handling,\\nAPI structure, and\\nDesign tradeoffs like consistency vs availability.\\nI made sure to cover both object-oriented design and real-world constraints (like syncing across time zones)."
      },
      {
        name: "📄 Round 5: Resume Drill / Deep Dive",
        content: "Walked through resume projects and past roles.\\nEmphasis on impact, technologies used, and challenges faced.\\nThey asked about one project in depth—how I designed it, what improvements I'd now make, and technical decisions behind it."
      },
      {
        name: "🎉 Result & Tips",
        content: "Result: Accepted Offer! ✅\\nAfter multiple rounds and a considerable waiting period post-superday, I finally received an offer letter.\\n\\n💡 Tips for Future Candidates:\\nPractice fundamentals – hashing, heaps, prefix/suffix arrays, and string manipulation.\\nBe ready to explain edge cases, time/space tradeoffs, and design choices clearly.\\nFor system design rounds, think like a product engineer – focus on usability, scalability, and reliability.\\nDon't forget behavioral prep – STAR format helps a lot."
      }
    ]
  },
  {
    id: 26,
    role: "Associate Software Engineer",
    yoe: "2.8 years",
    date: "May 17, 2025",
    author: "Anonymous User",
    rounds: [
      {
        name: "Background",
        content: "I interviewed for Goldman Sachs for Associate level in March, 2025.\\n\\nEducation - Circuital branch, top IIT.\\n\\nExperience - 2.8 years experience\\nPast Company - SDE2 at Product Based Company (26.4 base + 2.6 Bonus) LPA. Had ESOPs.\\n\\nProcess -\\n\\nGot a message from recruiter on linkedIn. Applied without referral."
      },
      {
        name: "Screening round - DSA",
        content: "Two easy questions. Solved both.\\nOne was on hashmap little logic building, another on reversing linked list.\\nThey made me run both code on coder pad with few test cases."
      },
      {
        name: "Super Day - Overview",
        content: "Had next four rounds on the same day - Super Day. Initially they scheduled 3 rounds, post the result they scheduled the 4th one in evening."
      },
      {
        name: "Round 1: DSA",
        content: "2 DSA problems, both around trees. One medium other one LC Hard(Both were on BST, had some discussions around 1st question on optimizing return , the other one involved finding LCA and some further solving)."
      },
      {
        name: "Round 2: LLD and HLD",
        content: "1 LLD and questions around HLD - This round wasn't that great for me (fumbled a bit in few HLD questions). LLD - LRU cache. The interviewer tried to dig deep in whatever I said, so I chose to not answer questions I was not sure of. HLD was mostly related to how we optimize writes in DB, around replication, archival, scaling and indexing of DB."
      },
      {
        name: "Round 3: HLD Case Study",
        content: "Mostly HLD case study regarding how you would approach a production issue. Had questions aroung my current experience, projects and their HLD and some related questions around possibilites of failure of production.\\n\\nHad positive feedback from the rounds and was called for a final round with the hiring manager"
      },
      {
        name: "Round 4: Hiring Manager",
        content: "Hiring manager round - Was supposed to be a non technical round of 30 mins. Hiring manager still asked some design questions (mostly easy) along with a couple HR type ques. Answered all correctly."
      },
      {
        name: "Round 5: Behavioral",
        content: "Behavioral round"
      },
      {
        name: "Verdict & Compensation",
        content: "Got the offer ✅\\n\\nCompensation:\\n36 LPA base + ~10 LPA bonus + 1.6L relocation + ESOP equivalency bonus (of current company for current FY)"
      }
    ]
  },
  {
    id: 27,
    role: "Analyst",
    yoe: "N/A",
    date: "May 07, 2025",
    author: "Anonymous User",
    rounds: [
      {
        name: "Background",
        content: "I applied via referral and received the test link almost a month later."
      },
      {
        name: "Round 1: Online HackerRank Test (120 mins)",
        content: "• There were 2 medium-level questions: one greedy and one graph-based.\\n• Completed both in around 40–45 minutes.\\n\\nI got the interview invite around 20 days later."
      },
      {
        name: "Round 2: CoderPad Interview (1 Interviewer)",
        content: "• CoderPad is a collaborative platform where both you and the interviewer can write code, with an IDE built-in.\\n• I was expected to write working code that passes test cases.\\n\\nQuestion 1:\\n• First Unique Character in a String – easy one, solved it in about 10 minutes.\\n\\nQuestion 2:\\n• A long string str was given, along with two other strings str1 and str2. I had to find the minimum distance between the occurrences of str1 and str2 in str, making sure str1 appeared before str2.\\n• There were multiple edge cases. The interviewer didn't point them out directly and wanted me to catch them by debugging through test cases. He was very helpful and patient.\\n• I couldn't solve all the edge cases due to time constraints, but the interviewer seemed satisfied with my approach and, I believe, mainly wanted to assess my debugging skills.\\n\\nI got a call the next day that I had cleared the round and would be moving on to the Super Day."
      },
      {
        name: "Super Day: 3–4 Interviews with 1-Hour Gaps",
        content: "Each round had 2 interviewers: one actively asking questions and the other mostly observing."
      },
      {
        name: "Round 3: Data Structures and Algorithms (60 minutes)",
        content: "Format: 2 Interviewers, each asked one coding question\\n\\nFind the Kth most frequent element in an array\\nUsed Min Heap\\nFind the length of the longest subarray with at most K distinct characters\\nApplied Sliding Window technique\\nSuccessfully solved both questions and passed test cases"
      },
      {
        name: "Round 4: Java and Software Engineering Principles",
        content: "Interviewers: 2\\n\\nWrapper classes in Java\\n\\nint vs Integer\\n\\nstatic keyword and static methods (asked to write code)\\n\\nDifference between ArrayList and LinkedList\\n\\nDOI (Date of Inception) in Java (implementation)\\n\\nSingleton class (implementation required)\\n\\nCreation of Linked List with insertion and deletion (code implementation)\\n\\nSeveral additional Java and OOP-related questions\\n\\nStruggled a bit in this round due to limited proficiency in Java"
      },
      {
        name: "Round 5: System Design",
        content: "Interviewers: 2 (One at VP level)\\nDiscussion on my personal project .How I designed and implemented it,Challenges I faced and how I tackled them\\n\\nDesign a Quora-like application\\n\\nSchema design\\nAPI structure\\nWrite SQL queries based on the schema\\nThis was my first-ever system design interview, and I found it challenging. I made several back-and-forth changes during schema design and missed some best practices."
      },
      {
        name: "Final Verdict & Learnings",
        content: "Rejected ❌\\n\\nFeedback:\\nSystem Design round received a negative review\\nJava/OOP round was also marked as uncertain\\n\\nOverall, it was a great learning experience. All interviewers were friendly and professional—it never felt like an interrogation."
      }
    ]
  },
  {
    id: 28,
    role: "Analyst - US",
    yoe: "N/A",
    date: "May 30, 2025",
    author: "starlord_c",
    rounds: [
      {
        name: "Coderpad round: 60mins",
        content: "Question-1\\nFind kth largest element.\\nGave heap solution. Satisfied with the approach.\\nasked for TC and SC.\\n\\nQuestion-2:\\n\\nGiven a 2D grid, each cell has a item which has value >=0, we are standing at bottom left cell of the grid and need to reach top right cell. So we need to reach from r-1,0 to 0,c-1 with maxValue.\\nused DP.\\nasked TC and SC."
      },
      {
        name: "Super Day - Round 1: Software Engineering Principles (45 mins)",
        content: "Resume grilling mostly on my work-ex.\\nLast 10 mins asked for Parking Lot LLD. Due to time crunch, wasn't able to frame my approach properly but gave the design."
      },
      {
        name: "Super Day - Round 2: DSA",
        content: "Question-1:\\nDesign data structure that stores an object that has following:\\nUnique-Id-String\\nVersion- Integer\\nFrom - TimeStamp\\nTo - TimeStamp\\n\\nWhen a new version is inserted, last version To date should be updated to latest version from date and then latest veersion should be inserted.\\n\\nTook about 30 mins to solve this as the question given was very vague and I had to ask all clarifying questions to give correct data structure.\\n\\nDue to time crunch question-2 only approach was asked.\\n\\nQuestion-2:\\n\\nGiven 3 category of people (lets say a,b,c) and no. of people of each category.\\nForm max number of teams of 3 people such that no team contains all people from same category.\\n\\nEx: a = 2, b=1, c=3\\nTeam-1: c c a\\nTeam-2: a b c\\nso answer = 2;\\nGave greedy approach."
      },
      {
        name: "Super Day - Round 3: Final Hiring Manager/Team round",
        content: "Resume grilling\\n\\nHiring Manager Round (30 mins):\\nAsked few questions from resume\\n\\nFew HR questions:\\n\\nGive a project where you are pruod of youself.\\nYou had more than one high priority tasks, how do you handle this situation.\\nWhy GS?\\nWhy are leaving your current company?"
      },
      {
        name: "Verdict",
        content: "Got the offer ✅"
      }
    ]
  },
  {
    id: 29,
    role: "Analyst",
    yoe: "0.7 years",
    date: "May 15, 2025",
    author: "Anonymous User",
    rounds: [
      {
        name: "Background",
        content: "Position: Analyst\\nExperience: 0.7 years\\nReferral: Referred by an Associate Software Engineer at Goldman Sachs"
      },
      {
        name: "Round 1: HackerRank Online Assessment (90 minutes)",
        content: "2 Coding Questions\\nOne question was based on Dynamic Programming\\nThe was Implementation provlem don't exactly remember the questions\\nBoth were of medium difficulty\\nSolved both questions"
      },
      {
        name: "Round 2: CoderPad Live Coding (60 minutes)",
        content: "Problem:\\nGiven a source and destination, print all the stations in the shortest path between them\\nLanguage: Java (in an online collaborative IDE - CoderPad)\\nFollow-up:\\nWhat if every edge between stations has unit weight (1)?\\nSolved both the main problem and follow-up\\n\\nGot a call from hr on the same fom the next set of rounds"
      },
      {
        name: "Super Day (3 Rounds Back-to-Back, Each ~1 Hour Apart)",
        content: "3 rounds scheduled back-to-back with approximately 1 hour gap between each"
      },
      {
        name: "Round 3: Data Structures and Algorithms (60 minutes)",
        content: "Format: 2 Interviewers, each asked one coding question\\n\\nFind the Kth most frequent element in an array\\nUsed Min Heap\\nFind the length of the longest subarray with at most K distinct characters\\nApplied Sliding Window technique\\nSuccessfully solved both questions and passed test cases"
      },
      {
        name: "Round 4: Java and Software Engineering Principles",
        content: "Interviewers: 2\\n\\nWrapper classes in Java\\n\\nint vs Integer\\n\\nstatic keyword and static methods (asked to write code)\\n\\nDifference between ArrayList and LinkedList\\n\\nDOI (Date of Inception) in Java (implementation)\\n\\nSingleton class (implementation required)\\n\\nCreation of Linked List with insertion and deletion (code implementation)\\n\\nSeveral additional Java and OOP-related questions\\n\\nStruggled a bit in this round due to limited proficiency in Java"
      },
      {
        name: "Round 5: System Design",
        content: "Interviewers: 2 (One at VP level)\\nDiscussion on my personal project .How I designed and implemented it,Challenges I faced and how I tackled them\\n\\nDesign a Quora-like application\\n\\nSchema design\\nAPI structure\\nWrite SQL queries based on the schema\\nThis was my first-ever system design interview, and I found it challenging. I made several back-and-forth changes during schema design and missed some best practices."
      },
      {
        name: "Final Verdict & Learnings",
        content: "Rejected ❌\\n\\nFeedback:\\nSystem Design round received a negative review\\nJava/OOP round was also marked as uncertain\\n\\nOverall, it was a great learning experience. All interviewers were friendly and professional—it never felt like an interrogation."
      }
    ]
  },
  {
    id: 30,
    role: "Analyst",
    yoe: "2 years 3 months",
    date: "Nov 17, 2024",
    author: "Anonymous User",
    rounds: [
      {
        name: "Background",
        content: "My background: Total 2 years 3 months experience\\nGot a referral for an Associate role. Received hackerrank test link a week later."
      },
      {
        name: "Round 1 - OA",
        content: "Don't remember the questions but one was an easy level question and second was leetcode medium level. Was able to solve both of them.\\nThe recruiter reached me and informed me that I would be considered for an Analyst profile as my years of experience are less than 3."
      },
      {
        name: "Round 2 - Coderpad (13th Sep 2024)",
        content: "Question 1\\nhttps://leetcode.com/problems/fraction-to-recurring-decimal/description/\\n\\nQuestion 2\\nhttps://leetcode.com/problems/trapping-rain-water/description/\\n\\nI explained the approach for the first problem and jumped into implementing it. For the second question, I discussed the extra space approach first and then explained the constant space approach and implemented it. I had to execute my code for some test cases. After that the interviewer added some more test cases. I had to handle some corner cases in the first problem in order to pass them."
      },
      {
        name: "Superday (18th Sep 2024) - Round 1: Data Structures",
        content: "Two interviewers were present, one question asked by each of them.\\nQuestion 1\\nhttps://leetcode.com/problems/pairs-of-songs-with-total-durations-divisible-by-60/description/\\n\\nQuestion 2\\nhttps://leetcode.com/problems/median-of-two-sorted-arrays/description/\\n\\nAgain the expectation here was to produce an optimized working solution that should pass the test cases. For the second question, we did a dry run on some test cases. In between, the first interviewer asked a few questions on APIs and databases, like how will you fetch a large data (1GB) using REST APIs, etc."
      },
      {
        name: "Superday - Round 2: Software Engineering Practices",
        content: "Two interviewers were present. The first interviewer asked this question.\\nQuestion 1\\nhttps://leetcode.com/problems/sliding-window-maximum/description/\\n\\nThe remaining 30 mins were dedicated to some discussion around my resume, operating system and system design concepts.\\nThe interviewer went in depth in one of my recent projects in my current company.\\nAfter that he started asking OS questions like:\\n\\nDifference between process and a thread\\nDeadlocks\\nWhat is semaphore and how it is used in OS\\nThe interviewer then asked how to handle concurrency in a theater booking system, focusing on how to make sure two users don't book the same seat at the same time. I was also asked about handling cases where payment doesn't go through and how to release the seat if the user doesn't complete the payment. The interviewer asked about what would be the best customer experience during the entire process. Additionally, the interviewer wanted to know how to identify and prevent payment failures before the user even goes to the payment page. We discussed using locking methods, setting time limits for holding seats, checking seat availability in real-time, and doing checks before sending users to the payment page."
      },
      {
        name: "Superday - Round 3: Software Design and Architecture",
        content: "Question 1\\nGiven a 2-D String array of student-marks, find the student with the highest average and output his average score. If the average is in decimals, floor it down to the nearest integer.\\n\\nInput:Bob : 87, Mike:35, Bob : 52, Jason : 35, Mike : 55, Jessica : 99\\nOutput: 99\\nExplanation: Since Jessica's average is greater than Bob's, Mike's and Jason's average.\\nI explained the brute force as well as the optimized approach. Then was expected to code and execute the sample test cases. The interviewer then added some additional test cases for these. Some tests were failing due to negative scores. Fixed the cases.\\n\\nThe second interviewer asked me some Java related questions like:\\n\\nComparator and Comparable\\nSerialization and Deserialization in Java\\nException handling related questions\\nI was asked how to design a system where employee records are sent from an upstream service to my service, which then updates the data in a downstream service. Handling the communication between services (Kafka / SNS-SQS (I had experience with SNS-SQS)). The same employee record with a different timestamp can arrive, we have to update the previous record based on timestamp. This timestamp is different from the current timestamp. (Records can come in any order of timestamps).\\nI clarified the requirements but felt that the time left was too low. Proposed the approach to the interviewer, he then asked me about the database choices (SQL / NOSQL) and was asked to write a schema for the employee record."
      },
      {
        name: "Round 4 - Hiring Manager",
        content: "It was a quick 20-25 mins call. The HM asked some questions like\\n\\nWhy I am leaving the current company at 1.5yrs only?\\nWhy GS?\\nAsked me to explain one of my recent projects in my current company, asked few questions on that\\nMy expectations from GS and the role\\nMy views on work from office culture\\nI asked him the team charter and goals for the next couple of years."
      },
      {
        name: "Verdict",
        content: "Received offer 2 weeks later ✅"
      }
    ]
  },
  {
    id: 31,
    role: "Associate",
    yoe: "N/A",
    date: "May 12, 2025",
    author: "Anonymous User",
    rounds: [
      {
        name: "Background",
        content: "I applied through job portal after recruiter contacted me. Soon after, I recieved a Hackerrank test link."
      },
      {
        name: "Round 1: Hackerrank test",
        content: "There were 2 Leetcode medium difficulty questions."
      },
      {
        name: "Round 2: Coderpad round",
        content: "Interviewer gave 2 questions to solve in Coderpad platform. Language was Java, although upon request I was allowed to code in C++.\\nhttps://leetcode.com/problems/merge-intervals/description/\\nhttps://leetcode.com/problems/climbing-stairs/description/\\nAfter solving he asked me if the code was production ready, and discussed the potential issues.\\nNext three rounds were held a week later, as part of the Superday.\\nThere's going to be 2 interviewers in the panel here onwards."
      },
      {
        name: "Round 3: DSA round",
        content: "I was given two problems to solve.\\nhttps://leetcode.com/problems/best-time-to-buy-and-sell-stock/\\nYou're given a number of Cars, Trucks and Activa's. Each takes a parking space of 2,3 and 1 respectively. You're also given an integer array having empty slots. Return whether its possible to park every vehicle in those slots.\\nAsked me about one of my projects in detail.\\nAdvantages of using Springboot while design APIs.\\nDependency injection. What is Singleton Bean. Design a class which acts like a Singleton bean.\\nI stuttered a bit while explaining Dependency injection, other than that everything went well."
      },
      {
        name: "Round 4: Software Engineering Practices",
        content: "You're given an integer array. Write a program that shuffles the array in random fashion.\\nThread and concurrency\\nDesign Reddit\\nI couldn't solve the DSA problem. Also I mentioned I had no experience in working with threads so she didn't porceed with the question.\\nAlso struggled with the design problem but interviewer helped me through it. Asked me to write appropriate SQL queries along the way.\\nI feel I messed up really bad in this round."
      },
      {
        name: "Round 5: Software Design and Architecture",
        content: "Design Bus ticket management system.\\nPart 1: Different busses with routes and bus stops are mentioned. Design an optimal approach that will give us the number of options a passenger will have to chose a bus for one point to another.\\nPart 2: Available tickets are also added to the problem. As bus moves from one stop to another, available tickets keep changing. How to design such a scenario.\\nDesign Google docs(in the form of an array), with features like snapshot. Should be space optimized to the fullest. I gave her 2 semi optimal approaches, but we couldn't discuss further as time was up.\\nThis round was also good imo, I could answer almost all the queries. Could be better if there was more time."
      },
      {
        name: "Verdict",
        content: "Rejected ❌\\n\\nI did not recieve any mail or call from recruiter post this. In application portal it shows 'Application Turndown', so I guess this is it."
      }
    ]
  },
  {
    id: 32,
    role: "Software Engineer",
    yoe: "N/A",
    date: "Jun 02, 2025",
    author: "Anonymous User",
    location: "Salt Lake City, US",
    rounds: [
      {
        name: "Goldman Sachs Coderpad Interview",
        content: "I was asked two questions\\n\\nQuestion 1:\\nGiven a 2D grid, each cell has a item which has value >=0, we are standing at bottom left cell of the grid and need to reach top right cell. We can travel in right and up direction.\\nE.g.\\n0 0 5\\n0 1 0\\n2 0 1\\nAns : 8\\n\\nQuestion 2:\\nA popular online retailer allows vendors to specify different prices in advance\\nfor the same item throughout the day. We now need to design an algorithm that\\nhelps identify the lowest price for the item at any point of the day.\\nAssumptions:\\n\\nFor the algorithm, assume all vendors are selling the same product\\nand there is only one product being sold. Given a list that has\\nvendor information - ( startTime, endTime, price ) of the deal,\\nreturn a sorted list with different intervals and\\nthe least price of the product during the interval.\\n\\nThe interval is inclusive of start and end time.\\n\\nAll the 3 values passed by the vendor are integers.\\n\\nsampleInput = { new Interval( 1, 5, 20 ), new Interval( 3, 8, 15 ), new Interval( 7, 10, 8 ) };\\nexpectedOutput = { new Interval( 1, 3, 20 ), new Interval( 3, 7, 15 ), new Interval(7,10,8)};\\n\\nI solved first question starting with brute force recursive approach and was able to pass all the test cases. Then I was telling optimized solution by memoization and bottom up tabulation but interviewer said brute force is fine and moved to 2nd Question.\\nFor 2nd question I was not able to solved it completely interviewer was friendly and gave me hints after hints I was able to write code completely but was not able to run it as time was over.\\nInterviewer was pushing me to write production level code eg. appropriate variable names, function names for eg. I used i, j for row , column for 1st question he asked me to change it to row, column.\\n\\nAfter 3 days I got email for Superday."
      },
      {
        name: "Superday - Round 1: Data Structures and Algorithms",
        content: "My superday had 3 rounds of 45 mins each.\\n\\n2 Interviewers joined the call. Started with introduction. Then asked role specific questios like 1) How will you setup mongoDB cluster? 2) How will you configure your application for MongoDB using Springboot.\\nDSA question asked was as follows :-\\nList indicating a book. Each element in the list represents one page of the book. The page is space delimited.\\nList Glossary word list\\nOutput: Create a glossary for each word in the glossary list which indicates page\\nnumbers where the word occurs.\\n\\nI was able to solve this question. Then as time was still left so they asked question what if you have huge data and limited CPU RAM how will your sort the data? -> I told merge sort and discussing on the same."
      },
      {
        name: "Superday - Round 2: Resume Depth",
        content: "Interviewer grilled on resume. I struggled to answer few questions like I worked on TOCTOU issue and for resolving this issue I used atomicOperation. Then interviewer went to underlying details of atomic operations how it works and how will you implement atomic operation function\\nand then taking this question to hashMap about how will handle concurrnecy in hashMap? I was not able to answer this question thoroughly."
      },
      {
        name: "Superday - Round 3: Design and Architecture",
        content: "I was asked Design Rate Limiter.\\nI was able to design but at the end while discussing about scalability I failed to answer one question which what will you if your redis cache is out of memory? I knew concept of data sharding but got blank not able to answer it properly."
      },
      {
        name: "Verdict",
        content: "I got rejection email after 3 weeks. ❌"
      }
    ]
  }
];
