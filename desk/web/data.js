// Throw — trick database. TH = throw hand, NTH = non-throw hand (freehand).
// Sources: yoyotricks.com (1A lists, Sport Ladder, trick pages), Skill Addicts' trick
// ladder, YoYoExpert's learn pages and forum tips. Steps are outlines: watch the linked
// tutorial for each, then come back here for the cues and fixes.

const YT = 'https://yoyotricks.com/yoyo-tricks/';
const LAD = 'https://yoyotricks.com/yoyo-trick-sport-ladder/';
const ytsearch = (q) => 'https://www.youtube.com/results?search_query=' + encodeURIComponent(q + ' yoyo trick tutorial');

window.THROW_LEVELS = [
  { n: 1, name: 'Foundations', blurb: 'The throw, the bind and the core mounts. Every later trick is built out of these, so get them clean before moving on.' },
  { n: 2, name: 'Unresponsive core', blurb: 'Rolls, whips and the first real combos. Here the yo-yo only comes back when you bind.' },
  { n: 3, name: 'Advanced', blurb: 'Hops, slack, flops and grinds. Each one is a new skill, not just a new string path.' },
  { n: 4, name: 'Expert', blurb: 'Hard hops, grinds and the Sport Ladder finishers. Give each of these weeks of practice.' },
];

window.THROW_CATS = {
  basics: 'Basics', mount: 'Mount', roll: 'Roll', whip: 'Whip', hop: 'Hop', slack: 'Slack', grind: 'Grind', flow: 'Flow', bind: 'Bind',
};

// goal = landed-in-a-row target that marks a trick "solid"
window.THROW_TRICKS = [
  // ---------------------------------------------------------------- level 1
  {
    id: 'sleeper', name: 'Sleeper', lvl: 1, cat: 'basics', pre: [], ladder: 1, goal: 10,
    url: LAD + '1a-1-the-sleeper/13347/',
    what: 'A hard, straight throw that leaves the yo-yo spinning at the end of the string. Every trick starts with one, and spin time is what you spend in a combo.',
    steps: [
      'Set the string length: with the yo-yo on the floor, the string should reach about to your belly button. Tie a slip knot on your middle finger, between the first and second knuckle.',
      'Hold the yo-yo palm up with the string coming over the top toward you. Curl your arm up like you are flexing your bicep.',
      'Throw straight down hard, and turn your hand palm-down at the bottom of the motion. Don\'t flip it early.',
      'Let the yo-yo spin at the end of the string. On an unresponsive yo-yo, bind to bring it back.',
    ],
    tips: [
      'Line up the yo-yo\'s gap with a floor tile seam or floorboard and throw so it spins along the line. Do this until you don\'t need the line.',
      'Throw harder than feels necessary. Spin time comes from a strong, straight throw, not from the bearing.',
      'Watch the string. If it rubs one side of the gap, the yo-yo is tilted.',
      'Aim for a 10-second sleeper before moving on. Aim for 30 seconds once you are binding.',
    ],
    mistakes: [
      'Flipping the wrist too early puts the yo-yo off angle and makes it tilt.',
      'Throwing out in front of you instead of straight down.',
      'String too long: if you are short, the yo-yo hits the floor. Cut it shorter.',
    ],
  },
  {
    id: 'bind', name: 'Bind', lvl: 1, cat: 'bind', pre: ['sleeper'], goal: 10,
    url: YT + 'binds/982/',
    alt: [['Easiest Bind Ever', YT + 'easiest-bind-ever/2942/'], ['Go-To Binds', YT + 'unresponsive/go-to-binds/195831/']],
    what: 'The bind is how an unresponsive yo-yo comes back. You feed a loop of slack into the gap, it catches on the axle, and the yo-yo winds itself up. You need it for every trick from here on, so practice it more than anything else.',
    steps: [
      'Throw a sleeper. Bring your NTH index into the string about halfway down, from the throw-hand side.',
      'Swing the yo-yo around your NTH index so the string from the yo-yo crosses over the string going up to your hand (the cross method).',
      'Lift your throw hand a little and drop your NTH a little, so the slack loop sinks into the gap.',
      'When you feel the string catch inside the yo-yo, pull your NTH out and give a small tug up. The yo-yo winds back to your hand.',
    ],
    tips: [
      'Practice the bind slowly so you can feel the moment the string grabs.',
      'Pinch method: pinch the string with your NTH thumb and index and hold the loop until it catches. Don\'t let go of the loop early.',
      'Bind with the yo-yo still spinning fast. A dying yo-yo is much harder to bind.',
      'Learn the sidestyle bind well first. Most of your tricks will end with it.',
      'Practice your binds and plan your combos around them. You can rarely practice binding too much.',
    ],
    mistakes: [
      'Binding in the wrong direction: the loop has to go in against the spin. If it won\'t catch, swing the yo-yo around your finger the other way.',
      'Wrap-and-throw binds leave slack wound the wrong way and mess up the next throw.',
      'Pulling too hard and too early before the string has caught.',
      'Knots: you\'ll get them while learning to bind. Pop the yo-yo off the string and untie them before they tighten.',
    ],
  },
  {
    id: 'breakaway', name: 'Breakaway', lvl: 1, cat: 'basics', pre: ['sleeper'], goal: 10,
    url: YT + 'the-breakaway/154/',
    what: 'A sideways throw that swings across your body and ends up sleeping at your NTH side. Almost every string trick starts from a breakaway.',
    steps: [
      'Hold your arm out to the side, palm up, and bend at the elbow like you are showing off a muscle.',
      'Snap your forearm down and across, releasing the yo-yo so it swings in a big arc across the front of your body.',
      'Let it travel to the NTH side and settle, sleeping, with the string in front of you.',
      'Keep the yo-yo\'s plane flat in front of your chest. It should not point toward you or away from you.',
    ],
    tips: [
      'Wall drill: stand 1-2 feet from a wall and throw breakaways without hitting it. Move closer as you get straighter. Eventually your toes should be a few inches from the wall.',
      'Point your NTH index forward as a target the string should hit about halfway down.',
      'Let gravity do the work at the end and let it swing like a pendulum.',
    ],
    mistakes: [
      'Throwing out in front so the yo-yo turns, and it tilts.',
      'A weak throw that dies before your first mount.',
    ],
  },
  {
    id: 'trapeze', name: 'Trapeze', lvl: 1, cat: 'mount', pre: ['breakaway', 'bind'], ladder: 7, goal: 10,
    url: YT + 'man-on-the-flying-trapeze/169/',
    what: 'The foundational mount. The yo-yo flips over your NTH index and lands on the string between your hands.',
    steps: [
      'Throw a breakaway with your NTH index pointing forward.',
      'Let the string hit your NTH index about halfway down. The yo-yo swings up and over the finger.',
      'As it comes over, guide it down onto the string between your hands.',
      'To dismount, pop the yo-yo back up and over your finger, let it hang and bind.',
    ],
    tips: [
      'Keep your NTH index as close to the yo-yo as possible, and watch the yo-yo loop over the finger.',
      'Keep the trapeze string roughly parallel to the floor. That stops the yo-yo from rolling around.',
      'Throw-hand thumb under the string helps the yo-yo land cleanly.',
      'If you miss to the side, the breakaway is crooked. Go back to the wall drill.',
    ],
    mistakes: [
      'Moving the NTH toward the yo-yo instead of letting the string come to it.',
      'Hands at different heights, so the yo-yo rolls off the string.',
    ],
  },
  {
    id: 'brain-twister', name: 'Brain Twister', lvl: 1, cat: 'mount', pre: ['bind'], ladder: 6, goal: 5,
    url: YT + 'brain-twister/195244/',
    what: 'A front-mount trick. The yo-yo loops around your NTH index in big vertical circles.',
    steps: [
      'Throw a sleeper. Put your NTH index into the string near the bottom and lift so the yo-yo flips over the finger onto the front string (the front mount).',
      'Push the string with your throw hand so the yo-yo swings over your NTH index in a full circle.',
      'Do one to three revolutions, then reverse the direction to unwind the same number of times.',
      'Drop the string off your finger and bind.',
    ],
    tips: [
      'The motion is small and comes from the TH. Your NTH barely moves.',
      'For the bind out of a front mount, switch the loop direction if it won\'t catch.',
    ],
    mistakes: [
      'Forgetting how many loops you did, so you unwind wrong and end up in a knot.',
    ],
  },
  {
    id: 'elevator', name: 'Elevator', lvl: 1, cat: 'basics', pre: ['trapeze'], ladder: 5, goal: 5,
    url: LAD + '1a-5-elevator/13469/',
    what: 'The yo-yo climbs the string like an elevator going up.',
    steps: [
      'Throw a sleeper and swing the yo-yo over your NTH index so it lands on the string, making a tall V.',
      'Raise your NTH and lower your throw hand. The yo-yo rides up the string toward the top.',
      'Release the string off your finger, let the yo-yo drop and bind.',
    ],
    tips: [
      'Do it on a long, steady sleeper. A slow yo-yo won\'t climb.',
    ],
    mistakes: [
      'Pulling too fast so the yo-yo hops off the string.',
    ],
  },
  {
    id: 'rock-the-baby', name: 'Rock the Baby', lvl: 1, cat: 'basics', pre: ['sleeper'], ladder: 4, goal: 5,
    url: LAD + '1a-4-rock-the-baby/13465/',
    what: 'A picture trick. The string becomes a cradle, and the spinning yo-yo rocks through it.',
    steps: [
      'Throw a strong sleeper and bring your throw hand up high.',
      'With your NTH, grab the string a few inches above the yo-yo and drape it over your spread throw-hand fingers to make a triangle (the cradle).',
      'Rock the yo-yo back and forth through the triangle two or three times.',
      'Let go with the NTH, let it drop and bind.',
    ],
    tips: ['Speed matters. Build the cradle in one smooth motion before the yo-yo slows.'],
    mistakes: ['Letting the yo-yo touch the string as it rocks, which kills the spin.'],
  },
  {
    id: 'tower', name: 'Eiffel Tower', lvl: 1, cat: 'basics', pre: ['sleeper'], ladder: 3, goal: 5,
    url: LAD + '1a-3-tower/13459/',
    what: 'A picture trick. You shape the string into a tall tower with the yo-yo hanging at the base.',
    steps: [
      'Throw a strong sleeper.',
      'Use your fingers to pick up and spread the string into the tower shape. Follow the tutorial for the finger order.',
      'Show the shape for a moment, drop everything off your fingers and bind.',
    ],
    tips: ['Learn the finger sequence slowly with a dead yo-yo first, then do it on a spinning one.'],
    mistakes: ['Leaving a finger caught in the string when you drop it, which makes a knot.'],
  },
  {
    id: 'split-the-atom', name: 'Split the Atom', lvl: 1, cat: 'mount', pre: ['trapeze'], ladder: 8, goal: 5,
    url: YT + 'split-the-atom/606/',
    what: 'The yo-yo swings around your NTH and lands on the string in a split-bottom mount.',
    steps: [
      'Throw a sleeper or breakaway with your NTH behind the string.',
      'Swing the yo-yo out and around your NTH from the front.',
      'Land it on the string between your hands in a split-bottom mount.',
      'Drop it off the front and bind.',
    ],
    tips: ['Watch the Split-Bottom Mount lesson too: ' + YT + 'split-bottom-mount/619/'],
    mistakes: ['Landing on the wrong string section so the yo-yo hangs off instead of mounting.'],
  },
  {
    id: 'brother', name: 'Trapeze and His Brother', lvl: 1, cat: 'mount', pre: ['trapeze'], goal: 10,
    url: YT + 'man-on-the-flying-trapeze-and-his-brother/616/',
    what: 'The trapeze plus one more string over your throw hand. This sets up Double or Nothing, Green Triangle and many combos.',
    steps: [
      'Land a trapeze.',
      'Swing the yo-yo out toward your throw hand and loop it once around your TH index.',
      'Carry it back over your NTH and land it on the outer string.',
      'Dismount: pop it out, let the strings fall off your fingers, then bind.',
    ],
    tips: ['Keep your hands wide and level so the strings stay separate.'],
    mistakes: ['Landing on the inner string. Aim for the string farthest from you.'],
  },
  {
    id: 'double-or-nothing', name: 'Double or Nothing', lvl: 1, cat: 'mount', pre: ['trapeze'], ladder: 9, goal: 10,
    url: YT + 'double-or-nothing/208/',
    what: 'The yo-yo wraps around both index fingers and lands on the outermost string. It\'s the mount Kwyjibo and many other tricks start or end in.',
    steps: [
      'Throw a breakaway as for a trapeze.',
      'Let the yo-yo wrap around your NTH index, then over your TH index, then around your NTH index again.',
      'Land it on the outermost string.',
      'To dismount, pop the yo-yo out, let the strings fall off both fingers and bind.',
    ],
    tips: [
      'Front-string landing fix: on the first loops let the string run around the base of your finger near the palm. On the last loop, run it over your fingertip by the nail.',
      'Keep your fingers pointed forward so the loops don\'t slide off.',
    ],
    mistakes: ['Pulling your hands apart too early, so the yo-yo has no room to land.'],
  },
  {
    id: 'one-half', name: '1.5 Mount', lvl: 1, cat: 'mount', pre: ['trapeze'], goal: 10,
    url: YT + 'one-and-a-half-side-mount/177/',
    what: 'A trapeze plus half a wrap. Barrel Rolls, Kwyjibo and a lot of whips start from it.',
    steps: [
      'Throw a breakaway.',
      'Let the yo-yo go over your NTH index as for a trapeze, but keep it swinging.',
      'As it comes around, put your TH index into the loop and land on the string nearest you between the indexes.',
      'Dismount by dropping the strings off and binding.',
    ],
    tips: ['Take it slowly. Make sure each string ends up where the tutorial shows before you add speed.'],
    mistakes: ['Landing on the far string. That makes a different mount.'],
  },

  // ---------------------------------------------------------------- level 2
  {
    id: 'mach-5', name: 'Mach 5', lvl: 2, cat: 'roll', pre: ['trapeze'], ladder: 10, goal: 5,
    url: YT + 'mach-5/771/',
    what: 'From a trapeze, the yo-yo whirls around your NTH index over and over.',
    steps: [
      'Land a trapeze.',
      'Swing your throw hand in big circles around your NTH so the yo-yo orbits your NTH index. Each lap wraps one more string.',
      'Do 3-5 laps, then circle the other way the same number of times to unwind.',
      'Dismount and bind.',
    ],
    tips: ['The circles come from the throw hand. Keep the NTH still and pointing forward.'],
    mistakes: ['Not unwinding the same number of laps, so the strings are left wound up.'],
  },
  {
    id: 'barrel-rolls', name: 'Barrel Rolls', lvl: 2, cat: 'roll', pre: ['one-half'], goal: 5,
    url: YT + 'barrel-rolls/622/',
    what: 'From a 1.5 mount, roll your throw hand around the yo-yo so it rolls through the strings.',
    steps: [
      'Land a 1.5 mount.',
      'Roll your TH over and under the yo-yo so it rolls through, keeping the strings separated.',
      'Do several rolls, then roll back the other way to undo them.',
      'Dismount and bind.',
    ],
    tips: ['Keep the rolls small and close to the yo-yo.'],
    mistakes: ['Big loose rolls that let the strings collapse together.'],
  },
  {
    id: 'double-trapeze', name: 'Double Trapeze', lvl: 2, cat: 'mount', pre: ['trapeze'], goal: 5,
    url: YT + 'double-trapeze/187/',
    what: 'A trapeze, then flip the yo-yo over your finger once more. It\'s easier than it looks.',
    steps: ['Land a trapeze.', 'Swing the yo-yo over your NTH index once more and land it on the outer string.', 'Try a triple or quadruple once it\'s solid.', 'Dismount and bind.'],
    tips: ['Each extra trapeze is the same motion. Keep it small and steady.'],
    mistakes: [],
  },
  {
    id: 'under-or-nothing', name: 'Under or Nothing', lvl: 2, cat: 'mount', pre: ['double-or-nothing'], goal: 5,
    url: YT + 'under-or-nothing/179969/',
    what: 'A Double or Nothing done from underneath.',
    steps: ['Watch the tutorial for the string path.', 'Swing the yo-yo under and around both indexes.', 'Land on the outer string, dismount, bind.'],
    tips: ['Learn it right after Double or Nothing while that motion is still fresh.'],
    mistakes: [],
  },
  {
    id: 'houdini', name: 'Houdini Mount', lvl: 2, cat: 'mount', pre: ['trapeze'], goal: 5,
    url: YT + 'houdini-mount/1506/',
    what: 'A mount that gets you into Kamikaze and other whip tricks.',
    steps: ['Throw a breakaway.', 'Pass the yo-yo around the back of your throw hand.', 'Land on the string as shown in the tutorial.', 'Dismount and bind.'],
    tips: ['Keep your TH thumb under the string so the loop forms cleanly.'],
    mistakes: [],
  },
  {
    id: 'cold-fusion', name: 'Cold Fusion', lvl: 2, cat: 'roll', pre: ['trapeze'], ladder: 11, goal: 5,
    url: YT + 'cold-fusion/1046/',
    what: 'A classic rotation from a trapeze, where the yo-yo orbits around and through the string as it goes.',
    steps: ['Land a trapeze.', 'Follow the tutorial\'s rotation: swing over the TH, then through.', 'Land back in trapeze, dismount and bind.'],
    tips: ['Learn the path slowly with a dead yo-yo hanging on the string.'],
    mistakes: ['Losing tension in the middle of the rotation and dropping the yo-yo off the string.'],
  },
  {
    id: 'pop-n-fresh', name: "Pop n' Fresh", lvl: 2, cat: 'flow', pre: ['brother'], ladder: 12, goal: 5,
    url: YT + 'pop-n-fresh/1042/',
    what: 'Pops the yo-yo between strings in a quick rhythm.',
    steps: ['Get into the starting mount from the tutorial.', 'Pop the yo-yo up off one string and catch it on the next.', 'Repeat in rhythm, then dismount and bind.'],
    tips: ['Short, sharp pops, not big swings. Learn the Pops lesson too: ' + YT + 'pops/16827/'],
    mistakes: [],
  },
  {
    id: 'skin-the-gerbil', name: 'Skin the Gerbil', lvl: 2, cat: 'roll', pre: ['trapeze'], ladder: 13, goal: 5,
    url: YT + 'skin-the-gerbil/1298/',
    what: 'From a trapeze, the yo-yo rolls over the top string again and again.',
    steps: ['Land a trapeze.', 'Swing the yo-yo over the top of the string so it rolls around it.', 'Do several rolls, then dismount and bind.'],
    tips: ['Keep the motion small and close to the string.'],
    mistakes: ['Letting the string go slack mid-roll.'],
  },
  {
    id: 'matrix', name: 'The Matrix', lvl: 2, cat: 'flow', pre: ['brother'], goal: 5,
    url: YT + 'the-matrix/1516/',
    what: 'Your hands pass the yo-yo back and forth in a flowing figure-eight.',
    steps: ['Land the starting mount.', 'Swing the yo-yo across one hand, then the other, in an alternating rhythm.', 'Dismount and bind.'],
    tips: ['Count the rhythm out loud. It\'s about timing more than string paths.'],
    mistakes: [],
  },
  {
    id: 'plastic-whip', name: 'Plastic Whip', lvl: 2, cat: 'whip', pre: ['trapeze'], ladder: 14, goal: 10,
    url: YT + 'plastic-whip/988/',
    what: 'Your first whip. You throw a loop of slack out and around the yo-yo, and it lands back on the string.',
    steps: ['Land a trapeze.', 'Release the string from your TH and throw a loop of slack out over the yo-yo.', 'The loop wraps around and you catch the string again.', 'Dismount and bind.'],
    tips: ['Smooth and quick works better than a hard throw.', 'Learn this early. Whips show up in a lot of later tricks.'],
    mistakes: ['Pushing the loop too far so it misses the yo-yo.'],
  },
  {
    id: 'buddhas-revenge', name: "Buddha's Revenge", lvl: 2, cat: 'mount', pre: ['brother'], goal: 5,
    url: YT + 'buddhas-revenge/726/',
    what: 'The yo-yo bounces between the strings of a vertical structure.',
    steps: ['Land the mount from the tutorial.', 'Raise your NTH so the structure goes vertical.', 'Bounce the yo-yo off the top string a few times, dismount and bind.'],
    tips: ['As the yo-yo comes around to bounce into the top string, lift your NTH so the structure is vertical. That keeps the top string rigid.'],
    mistakes: [],
  },
  {
    id: 'green-triangle', name: 'Green Triangle', lvl: 2, cat: 'mount', pre: ['brother'], goal: 5,
    url: YT + 'green-triangle-basics/1312/',
    what: 'A triangle-shaped mount used from intermediate all the way to expert combos. Brentstole and many others start from it.',
    steps: [
      'Start as for Trapeze and His Brother, but go behind the string.',
      'Mount the yo-yo over your hand.',
      'Let the rest of the string fall off your hand. You\'re in the Green Triangle.',
      'To get out, hook the string, bend it forward and pop the yo-yo out the back toward yourself.',
    ],
    tips: [
      'Exit direction matters. For the basic GT, pop it out the back. GT Laceration exits out the front, so check each GT trick.',
      'If you get stuck, pop the yo-yo out one side and land it back on a trapeze.',
    ],
    mistakes: [
      'Dropping the yo-yo to exit ties it into a knot.',
      'Popping it out the front on the basic GT knots the string when you bind.',
    ],
  },
  {
    id: 'wrist-mount', name: 'Wrist Mount', lvl: 2, cat: 'mount', pre: ['trapeze'], goal: 5,
    url: YT + 'wrist-mount/6009/',
    what: 'Mount the yo-yo around your NTH wrist. It opens up a lot of whip and slack tricks.',
    steps: ['Throw a breakaway.', 'Swing the yo-yo around your NTH wrist instead of your finger.', 'Land on the string as shown, dismount and bind.'],
    tips: ['See Three Wrist Mount Entrances for more ways in: ' + YT + 'three-wrist-mount-entrances/224187/'],
    mistakes: [],
  },
  {
    id: 'zipper', name: 'Zipper', lvl: 2, cat: 'roll', pre: ['trapeze'], goal: 5,
    url: YT + 'zipper/14568/',
    what: 'A back-and-forth unzipping motion along the string from a trapeze.',
    steps: ['Land a trapeze.', 'Follow the tutorial\'s zip motion with your throw hand.', 'Dismount and bind.'],
    tips: ['Small, quick movements.'],
    mistakes: [],
  },

  // ---------------------------------------------------------------- level 3
  {
    id: 'eli-hops', name: 'Eli Hops', lvl: 3, cat: 'hop', pre: ['trapeze'], ladder: 15, goal: 10,
    url: YT + 'eli-hops/255/',
    what: 'The yo-yo hops off the string and lands back on it. This teaches slack control for every hop trick.',
    steps: [
      'Land a trapeze with the yo-yo close to your NTH.',
      'Pull your hands apart slightly, then bring them back together almost at once. The yo-yo hops off the string.',
      'As it comes down, pull your hands apart again to make a platform. Land it close to your NTH.',
      'Repeat. Start with high vertical hops, then try sideways.',
    ],
    tips: [
      'Pulling apart keeps the string taut so the yo-yo arcs. Bringing your hands together gives slack, and the yo-yo keeps flying in its direction of travel.',
      'Bring your hands fully together to hop higher. Lift your NTH to send it straight up.',
      'A wide yo-yo makes aiming easier.',
      'Sideways hops: send it above your hand and lower your hands, or send it below and lift your hands at the end.',
    ],
    mistakes: [
      'Moving your hands forward or back, so the yo-yo misses the string. Keep your hands in line.',
      'Too much slack folds the string and leaves no platform to land on.',
      'Pulling back too late on sideways hops, so the yo-yo drops below your hand.',
    ],
  },
  {
    id: 'boingy-boing', name: 'Boingy-Boing', lvl: 3, cat: 'hop', pre: ['brother'], ladder: 16, goal: 10,
    url: YT + 'boingy-boing/765/',
    what: 'The yo-yo bounces between the strings of a brother mount like a trampoline.',
    steps: ['Land Trapeze and His Brother.', 'Bounce the yo-yo up and down between the strings.', 'Keep the rhythm going, then dismount and bind.'],
    tips: ['The motion is up and down, not side to side.', 'Keep the rhythm going and don\'t pause. Tilting the strings slightly downward can help.'],
    mistakes: ['Stopping between bounces, so it loses its rhythm and falls out.'],
  },
  {
    id: 'gyroscopic-flop', name: 'Gyroscopic Flop', lvl: 3, cat: 'roll', pre: ['trapeze'], ladder: 17, goal: 5,
    url: YT + 'gyroscopic-flop/6940/',
    what: 'The yo-yo flops around the string over and over while it stays mounted.',
    steps: ['Get into the starting mount from the tutorial.', 'Rotate your throw wrist in the spin direction so the yo-yo flops around the string.', 'Keep it going, then dismount and bind.'],
    tips: [
      'Point the structure down, no more than about 45 degrees. Players disagree here, but a slanted structure puts less tension on the lower string.',
      'Don\'t pull the strings too tight or too loose.',
      'Keep the string off the sides of the yo-yo. Rubbing kills the spin.',
    ],
    mistakes: ['The string rubs the walls of the yo-yo and it dies.'],
  },
  {
    id: 'kwyjibo', name: 'Kwyjibo', lvl: 3, cat: 'hop', pre: ['one-half', 'double-or-nothing'], ladder: 18, goal: 5,
    url: YT + 'kwyjibo/953/',
    what: 'A series of hops: single, to 1.5, to double. You exit with a Double or Nothing dismount.',
    steps: [
      'Start in a single (trapeze) mount.',
      'Hop to the 1.5: cross your hands and catch the yo-yo on the string.',
      'Reset: uncross, then cross the other way.',
      'Hop to the double: pop the yo-yo up, uncross, and catch it on the outside string.',
      'Dismount as for Double or Nothing and bind.',
    ],
    tips: [
      'The first hop (single to 1.5) is the hardest. Drill it by itself.',
      'Hit the string near the yo-yo. Hitting far from it makes the catch harder.',
      'First hop: TH on top. Second hop: NTH on top.',
      'Catch the first hop on your knuckle about 1 cm below the nail. Stay close to the yo-yo, like in a trapeze.',
      'Connect the hops without pausing.',
    ],
    mistakes: ['Catching on the wrong string ruins the double setup.', 'Mixing up which hand goes on top for each hop.'],
  },
  {
    id: 'hook', name: 'Hook', lvl: 3, cat: 'whip', pre: ['bind'], ladder: 19, goal: 10,
    url: YT + 'hook-i-e-hidemasa-hook/1001/',
    what: 'The Hidemasa Hook. The string hooks over your NTH as the yo-yo comes past. It teaches you the feel of unresponsive play.',
    steps: ['Throw a breakaway.', 'Hook the string over your NTH from behind as the yo-yo swings past.', 'Let it settle, then bind.'],
    tips: ['Keep it relaxed. It\'s a small, quick motion.', 'Then learn the 1.5 Hook: ' + YT + '1-5-hook/221323/'],
    mistakes: [],
  },
  {
    id: 'slackicide', name: 'Suicide / Slackicide', lvl: 3, cat: 'slack', pre: ['trapeze', 'plastic-whip'], ladder: 20, goal: 5,
    url: YT + 'slackicide/1322/',
    what: 'You let go of a loop, it spins in the air around the yo-yo, and you catch it again.',
    steps: ['Land a trapeze.', 'Swing your NTH index toward your throw hand.', 'Just before your hands touch, toss the loop up and drop your NTH index out toward the NTH side.', 'Catch the loop back on your finger, dismount and bind.'],
    tips: [
      'Keep string tension as neutral as you can. Leftover twist makes the loop flip unpredictably.',
      'Watch the yo-yo, not the loop.',
    ],
    mistakes: ['Releasing too late, so the loop collapses before you can catch it.'],
  },
  {
    id: 'slack-trapeze', name: 'Slack Trapeze', lvl: 3, cat: 'slack', pre: ['trapeze', 'plastic-whip'], goal: 5,
    url: YT + 'slack-trapeze/12857/',
    what: 'A whip of slack that lands as a trapeze. It\'s one of the most useful slack moves.',
    steps: ['Get into the starting mount.', 'Throw a loop of slack around the yo-yo.', 'Catch it as a trapeze, dismount and bind.'],
    tips: ['Use a steady, even motion so the loop stays open.'],
    mistakes: [],
  },
  {
    id: 'brother-slack', name: 'Brother Slack', lvl: 3, cat: 'slack', pre: ['brother', 'plastic-whip'], goal: 5,
    url: YT + 'man-on-the-flying-trapeze-and-his-brother-slack/1478/',
    what: 'Whip the brother string around and catch it again. It works well in the middle of a combo.',
    steps: ['Land Trapeze and His Brother.', 'Pinch the string against your TH index with your thumb.', 'Release the string off that finger and whip it around to the outside.', 'Catch it as it comes back around and put your finger back in. Dismount and bind.'],
    tips: ['The key is a nice steady swoosh. An even motion keeps the loop open so the catch is easier.'],
    mistakes: ['A jerky motion collapses the loop.'],
  },
  {
    id: 'laceration', name: 'Laceration', lvl: 3, cat: 'whip', pre: ['bind'], goal: 10,
    url: YT + 'laceration/999/',
    what: 'A whip that sends the yo-yo around your throw hand and back. It\'s fast, flashy and a building block for combos.',
    steps: ['Throw a breakaway.', 'Whip the string so the yo-yo swings around the front of your throw hand.', 'Catch it back into a mount or go straight into a bind.'],
    tips: ['Learn One Handed Laceration Style Binds next: ' + YT + 'one-handed-laceration-style-binds/178218/'],
    mistakes: [],
  },
  {
    id: 'magic-drop', name: 'Magic Drop / Shockwave', lvl: 3, cat: 'roll', pre: ['trapeze'], goal: 5,
    url: YT + 'magic-drop-and-shockwave/6362/',
    what: 'The yo-yo drops through an L-shaped structure and "magically" ends up back on the string.',
    steps: ['Make an L-shape with your NTH thumb and index.', 'Swing the yo-yo through the structure as shown.', 'Let it drop into place, dismount and bind.'],
    tips: ['Make the L as wide as possible.', 'Swing close to your hand and slowly, so the yo-yo floats.', 'Tilt your throw hand slightly down.', 'Your TH thumb position is the most common early mistake. Copy the tutorial exactly.'],
    mistakes: ['Wrong TH thumb position.'],
  },
  {
    id: 'iron-whip', name: 'Iron Whip', lvl: 3, cat: 'whip', pre: ['plastic-whip'], ladder: 21, goal: 5,
    url: YT + 'iron-whip/6172/',
    what: 'A harder relative of the Plastic Whip, with the loop whipped the other way.',
    steps: ['Get into the starting mount.', 'Whip the slack around as shown in the tutorial.', 'Catch, dismount and bind.'],
    tips: ['Get the Plastic Whip consistent first.'],
    mistakes: [],
  },
  {
    id: 'jade-whip', name: 'Jade Whip', lvl: 3, cat: 'whip', pre: ['plastic-whip'], goal: 5,
    url: YT + 'jade-whip/5943/',
    what: 'A whip that lands in a mount used to get into Drop in the Bucket and other tricks.',
    steps: ['Land a trapeze.', 'Whip as shown in the tutorial.', 'Land in the jade mount, dismount and bind.'],
    tips: [],
    mistakes: [],
  },
  {
    id: 'kamikaze', name: 'Kamikaze', lvl: 3, cat: 'mount', pre: ['houdini'], ladder: 22, goal: 5,
    url: YT + 'kamikaze-mount/6424/',
    what: 'A Houdini-style mount followed by a single pop that lands on two strings.',
    steps: ['Get into the Houdini-type mount.', 'Lift your TH thumb to separate the loop around your NTH thumb.', 'Bring your NTH thumb and index together so one pop lands on both strings.', 'Dismount and bind.'],
    tips: ['Keep your throw-hand thumb under the string while you go into the mount.'],
    mistakes: [],
  },
  {
    id: 'revolutions', name: 'Revolutions', lvl: 3, cat: 'roll', pre: ['trapeze'], goal: 5,
    url: YT + 'revolutions/1040/',
    what: 'The yo-yo orbits the string while your hands rotate, and it stays on the string.',
    steps: ['Get into the starting mount from the tutorial.', 'Rotate your hands so the yo-yo revolves around the string.', 'Dismount and bind.'],
    tips: ['A strong throw helps. This trick uses up a lot of spin.'],
    mistakes: [],
  },
  {
    id: 'finger-grind', name: 'Finger Grind', lvl: 3, cat: 'grind', pre: ['bind'], goal: 10,
    url: YT + 'grind-introduction-finger-grinds/11823/',
    what: 'Balance the spinning yo-yo on your fingertip against the cup or rim.',
    steps: ['Throw a strong breakaway.', 'Bring your NTH fingertip under the yo-yo\'s rim or cup.', 'Let it spin on your fingertip, then drop it back onto the string and bind.'],
    tips: ['Use a yo-yo with a blasted or grindable finish.', 'Move your finger with the yo-yo. Don\'t hold it rigid.'],
    mistakes: ['Grinding on a slick, polished yo-yo kills the spin.'],
  },
  {
    id: 'rejection', name: 'Backhand Rejection', lvl: 3, cat: 'flow', pre: ['laceration'], goal: 5,
    url: YT + 'rejection-introduction-backhand-rejection/43721/',
    what: 'The yo-yo bounces off the string and away instead of mounting. Rejections are the base of modern flow.',
    steps: ['Get into the setup from the tutorial.', 'Let the yo-yo hit the string and bounce off, or "reject", in the other direction.', 'Go into a bind or the next element.'],
    tips: [],
    mistakes: [],
  },

  // ---------------------------------------------------------------- level 4
  {
    id: 'spirit-bomb', name: 'Spirit Bomb', lvl: 4, cat: 'flow', pre: ['double-or-nothing'], ladder: 23, goal: 3,
    url: LAD + '1a-23-spirit-bomb/13662/',
    what: 'A long, dense string structure where the yo-yo works its way through a series of strings.',
    steps: ['Build the starting structure from the tutorial.', 'Drop the yo-yo through each string in sequence.', 'Dismount and bind.'],
    tips: ['Learn it a few strings at a time. Get the first half clean before you add the rest.'],
    mistakes: [],
  },
  {
    id: 'throwhand-grind', name: 'Throwhand Grind', lvl: 4, cat: 'grind', pre: ['finger-grind'], ladder: 24, goal: 5,
    url: LAD + '1a-24-throwhand-grind/13672/',
    what: 'Grind the yo-yo on your throw hand while it\'s still on the string.',
    steps: ['Throw a strong breakaway.', 'Bring the yo-yo up onto your throw-hand finger or thumb.', 'Let it grind, drop it back onto the string and bind.'],
    tips: ['Keep the string out of the way so it doesn\'t rub.'],
    mistakes: [],
  },
  {
    id: 'black-hops', name: 'Black Hops', lvl: 4, cat: 'hop', pre: ['eli-hops', 'double-or-nothing'], ladder: 25, goal: 3,
    url: LAD + '1a-25-black-hops/13675/',
    what: 'Hops from one Double or Nothing mount to another. It\'s the last trick on the Sport Ladder.',
    steps: ['Land a Double or Nothing.', 'Hop the yo-yo up and over, landing in a new Double or Nothing.', 'Repeat, then dismount and bind.'],
    tips: ['Learn it as Double or Nothing to Double or Nothing first, one hop at a time.', 'Get Eli Hops and Kwyjibo solid first. Black Hops reuse that slack control.'],
    mistakes: [],
  },
  {
    id: 'brentstole', name: 'Brentstole (GT Laceration)', lvl: 4, cat: 'whip', pre: ['green-triangle', 'laceration'], goal: 5,
    url: YT + 'gt-laceration-aka-brent-stole/5612/',
    what: 'A laceration that comes out of a Green Triangle. It\'s a staple of modern combos.',
    steps: ['Get into a Green Triangle.', 'Exit out the front with a laceration motion.', 'Catch into the next mount or bind.'],
    tips: ['Unlike the basic GT, this one exits out the front.'],
    mistakes: [],
  },
  {
    id: 'reverse-brentstole', name: 'Reverse Brentstole', lvl: 4, cat: 'whip', pre: ['brentstole'], goal: 5,
    url: YT + 'reverse-brent-stole/239362/',
    what: 'A Brentstole done in reverse.',
    steps: ['Get into the setup.', 'Do the Brentstole motion in reverse.', 'Catch or bind.'],
    tips: [],
    mistakes: [],
  },
  {
    id: 'seasick', name: 'Seasick', lvl: 4, cat: 'roll', pre: ['revolutions'], goal: 3,
    url: YT + 'seasick/1048/',
    what: 'A rolling, rocking trick with a lot of string rotation.',
    steps: ['Get into the starting mount.', 'Follow the tutorial\'s rotation sequence.', 'Dismount and bind.'],
    tips: [],
    mistakes: [],
  },
  {
    id: 'fingerspin', name: 'Fingerspin', lvl: 4, cat: 'grind', pre: ['finger-grind'], goal: 5,
    url: YT + 'finger-spins/172249/',
    what: 'The yo-yo spins on your fingertip in its center cup.',
    steps: ['Throw hard and bring the yo-yo up horizontal.', 'Catch it on your fingertip in the cup.', 'Let it spin, toss it back to the string and bind.'],
    tips: ['You need a yo-yo with a fingerspin dimple or cup.'],
    mistakes: [],
  },
  {
    id: 'double-suicide', name: 'Double Suicide', lvl: 4, cat: 'slack', pre: ['slackicide'], goal: 3,
    url: ytsearch('double suicide'),
    what: 'Two suicide loops released and caught one after the other.',
    steps: ['Get into the starting mount.', 'Release the first loop and catch it.', 'Release the second loop and catch it.', 'Dismount and bind.'],
    tips: ['String tension needs to be neutral. Fix it before trying this.'],
    mistakes: [],
  },
];

// ---------------------------------------------------------------- the 1A Sport Ladder (yoyotricks.com)
// The app maps each ladder number to a trick in THROW_TRICKS where one exists.
window.THROW_LADDER = [
  'Sleeper', 'Side Throw (World Tour)', 'Tower', 'Rock the Baby', 'Elevator', 'Brain Twister', 'Trapeze', 'Split the Atom',
  'Double or Nothing', 'Mach 5', 'Cold Fusion', "Pop n' Fresh", 'Skin the Gerbil', 'Plastic Whip', 'Eli Hops', 'Boingy-Boing',
  'Gyroscopic Flop', 'Kwyjibo', 'Hook', 'Suicide', 'Iron Whip', 'Kamikaze', 'Spirit Bomb', 'Throwhand Grind', 'Black Hops',
];
window.THROW_LADDER_RULES = [
  'The ladder is called one trick at a time, in order, and you get one attempt at each.',
  'Two misses end your run. Your score is the number of tricks completed.',
  'A trick is missed if it\'s done incorrectly, the yo-yo doesn\'t come back to your hand, a string hit fails, or you lose control in a significant way.',
  'Catch with your throw hand, not with two hands or against your body.',
  'Extra repetitions are allowed, but a mistake on an extra repetition still counts as a miss.',
];

// ---------------------------------------------------------------- guide articles
window.THROW_GUIDES = [
  {
    id: 'setup', title: 'Setup: string, knot, yo-yo', body: [
      ['p', 'Learn on a responsive yo-yo with a ball bearing if you can. Starting on a yo-yo that\'s too advanced is one of the most common mistakes. Many starter yo-yos come with a wider "unresponsive" bearing you can swap in once you can bind.'],
      ['p', 'Avoid toy-store fixed-axle yo-yos for string tricks. They can\'t sleep long enough.'],
      ['h', 'String length'],
      ['p', 'Let the yo-yo rest on the floor and cut the string about at your belly button. Tie a loop and make a slip knot. Wear it on your middle finger between the first and second knuckle.'],
      ['h', 'Learning to bind'],
      ['p', 'Use a low-response or no-response butterfly-shaped yo-yo. If binding still feels too hard, put the narrow bearing back in so the yo-yo returns with a tug. Practice your throw and beginner tricks that way, then switch back to the wide bearing.'],
    ],
  },
  {
    id: 'tension', title: 'String tension', body: [
      ['p', 'Every throw, forward or sideways, adds twist to the string. Too much twist and the string loops on itself, the yo-yo dies early, and slack tricks behave strangely.'],
      ['h', 'Fix: the trapeze method'],
      ['ol', [
        'Throw a trapeze.',
        'Hook the string over your thumb and pull the middle string in front of the yo-yo with your first finger.',
        'The yo-yo loosens or tightens the string with each pass. Check how it hangs and repeat until it hangs neutral.',
      ]],
      ['h', 'Fine adjustment'],
      ['p', 'Pinch the string and let the yo-yo hang. Note which way the string coils. Wrap it the opposite way the same number of turns. That should remove nearly all the tension.'],
      ['h', 'Prevent it'],
      ['p', 'If you\'re still wrapping by hand instead of binding, alternate the direction you wrap each time. Snap-starts and flick-winds also help keep tension even.'],
    ],
  },
  {
    id: 'bind', title: 'How to bind', body: [
      ['p', 'An unresponsive yo-yo won\'t come back on its own. You have to feed it a loop of slack so the string catches on the axle. Binds are generally easier when the yo-yo is on the string facing the opposite way from your throw.'],
      ['h', 'Method 1: pinch'],
      ['ol', ['Get the yo-yo on the string facing the opposite way. For a front mount you usually flip it.', 'Pinch the string with your NTH thumb or index, with the string wrapped over that finger.', 'Raise your yo-yo hand slightly.', 'When you feel the string wrap the axle, release the pinch and pull your NTH out. The yo-yo should wind back up.']],
      ['h', 'Method 2: cross'],
      ['ol', ['Cross the string.', 'Lift your yo-yo hand and lower your NTH slightly.', 'When you feel tension inside the yo-yo, pull your NTH out. The yo-yo comes back up.']],
      ['p', 'Many players only use the cross method. Avoid "wrap and throw". It leaves the start of the wrap going the wrong way, and that slack messes up your next throw.'],
      ['h', 'From a dead yo-yo'],
      ['p', 'Mount it as for a front mount (or the opposite direction for a side mount). Or spin it, catch it on a trapeze in the air, then bind.'],
    ],
  },
  {
    id: 'care', title: 'String and bearing care', body: [
      ['p', 'Change your string often: every 30-120 minutes of play. Throw\'s Log tab counts minutes since your last string change.'],
      ['p', 'Change it sooner if it looks fuzzy, thin, discolored or greasy, or if binds suddenly feel snaggy or slippy.'],
      ['p', 'A new bearing is often loud and spins slowly at first. Many players run it in or clean it before deciding it\'s bad. Neglected tension and a dry or dirty bearing are a common cause of knots and broken strings.'],
      ['p', 'Response pads wear down. If binds start slipping on a yo-yo that used to bind fine, the pads may need replacing.'],
    ],
  },
  {
    id: 'practice', title: 'How to practice', body: [
      ['ul', [
        'Watch the whole tutorial, including the slow-motion part. Read the on-screen text. The points it stresses are usually what make the trick work.',
        'Slow down. Get the string path right at low speed, then build speed. Keep your timing even. Rushing then dragging is a common way to miss.',
        'Expect anywhere from 1 to 500 tries. Being stuck is normal and not a sign you should quit.',
        'If you\'re stuck on a trick, switch to another and come back. Rotate a few tricks per session so you don\'t burn out on one.',
        'Take breaks. Hours of continuous practice tire your hands and slow muscle memory. Short sessions with rests work better. Some players take a day or two off to come back fresh.',
        'Keep your body still. Move only your hands, and avoid swaying with the yo-yo.',
        'Practice binds constantly, especially the sidestyle bind.',
        'Once a trick is consistent, run it in a combo from start to finish without stopping, as if you were on stage.',
      ]],
      ['p', 'Players disagree about whether to polish each trick until it looks clean or learn lots of tricks to build general skill. Throw\'s "solid" goal is a middle ground: land it N times in a row, then move on and come back for review.'],
    ],
  },
  {
    id: 'terms', title: 'Glossary', body: [
      ['dl', [
        ['TH / NTH', 'Throw hand / non-throw hand (also called freehand).'],
        ['1A', 'Single yo-yo string tricks. 2A is looping with two yo-yos, 3A is two yo-yos doing string tricks, 4A is offstring, 5A is freehand (counterweight).'],
        ['Responsive', 'Comes back with a tug. Unresponsive yo-yos need a bind.'],
        ['Bind', 'Feeding a loop of slack into the gap so the string catches and the yo-yo winds back up.'],
        ['Mount', 'Landing the yo-yo on the string in a set shape, such as a trapeze or Double or Nothing.'],
        ['Front string / back string', 'The string nearer to or farther from you in a mount.'],
        ['Dismount', 'Getting the yo-yo off a mount cleanly before the next element or bind.'],
        ['Whip', 'Throwing a loop of string around the yo-yo.'],
        ['Slack', 'Letting go of tension so a loop of string moves freely. Slack tricks are about releasing and catching that loop.'],
        ['Hop', 'Popping the yo-yo off the string and landing it again.'],
        ['Grind', 'Spinning the yo-yo on your skin (fingertip, arm, thumb) instead of the string.'],
        ['GT', 'Green Triangle, a triangle mount used in a lot of combos.'],
        ['Tilt', 'The yo-yo\'s plane twists so the string rubs the walls. Fix it with a straighter throw.'],
        ['Snag', 'The yo-yo grabs the string and climbs back when you don\'t want it to.'],
      ]],
    ],
  },
];

// ---------------------------------------------------------------- troubleshooting: problem → fixes
window.THROW_FIXES = [
  { q: 'The yo-yo tilts or dies quickly', a: [
    'Your throw is crooked. Throw harder and straighter: line the gap up with a floor seam (sleeper) or practice near a wall (breakaway).',
    'Keep the string centered in the gap. If it rubs the walls, you lose spin fast.',
    'Correct tilt mid-trick by twisting your throw hand slightly in the direction of tilt.',
    'Check the string. Old, fuzzy string drags.',
  ] },
  { q: "The bind won't catch", a: [
    'You may be binding in the wrong direction. Swing the yo-yo around your finger the other way so the loop goes in against the spin.',
    'Make a bigger loop, and pinch it with your NTH while you pull up with your throw hand.',
    'Don\'t drop the loop too soon. Wait until you feel it grab.',
    'Bind while the yo-yo is still spinning fast.',
    'Still nothing? Response pads may be worn, or the string too thin or slick. Try a new string first.',
  ] },
  { q: 'The yo-yo snags or comes back by itself', a: [
    'The string has too much tension. See the String tension guide.',
    'The bearing may be dirty or dry. Clean it or run it in.',
    'With a responsive bearing, too many strings in a mount touch the walls and grab. Try a wider bearing or a thinner string.',
  ] },
  { q: 'Knots after binding', a: [
    'Some knots are normal while you\'re learning to bind. Untie them right away.',
    'On Green Triangle tricks, the exit direction matters. Popping out the wrong side and then binding knots the string.',
    'A wrap-and-throw bind leaves slack the wrong way. Use the pinch or cross bind.',
  ] },
  { q: 'The trapeze rolls or falls off', a: [
    'Keep the trapeze string roughly parallel to the floor, with your hands level.',
    'Keep your NTH index close to the yo-yo and watch it loop over the finger.',
    'Check your breakaway. A crooked throw lands crooked.',
  ] },
  { q: 'Double or Nothing lands on the wrong string', a: [
    'On the first loops, let the string run around the base of your finger near the palm. On the last loop, run it over your fingertip by the nail.',
    'Keep your hands wide enough that the strings don\'t bunch together.',
  ] },
  { q: 'Hops miss the string', a: [
    'Keep your hands in line. Moving them forward or back puts the string out of line with the yo-yo.',
    'Don\'t give too much slack, or the string folds and there\'s nothing to land on.',
    'On sideways hops, pull back sooner, and drop your hands slightly.',
    'For Kwyjibo, hit the string near the yo-yo and catch on your knuckle about 1 cm below the nail.',
  ] },
  { q: 'Slack and whips collapse', a: [
    'Neutralize the string tension first. Twisted string makes loops flip in the air.',
    'Use a steady, even swoosh instead of a hard jerk. An even motion keeps the loop open.',
  ] },
  { q: "I'm stuck on a trick", a: [
    'Watch the slow-motion part of the tutorial again and copy the finger and thumb positions exactly.',
    'Go back to the prerequisite and get it solid. Most stuck tricks are really a weak earlier trick.',
    'Switch to a different trick and come back tomorrow. Muscle memory often settles overnight.',
    'Take a break. Tired hands make sloppy mounts.',
  ] },
  { q: 'Hands hurt / string burn', a: [
    'Move the slip knot so it sits between the first and second knuckle of your middle finger, not at the fingertip.',
    'Take short breaks. Some players use a glove on the throw hand for long sessions.',
    'A frayed string cuts more. Replace it.',
  ] },
];

window.THROW_TIPS = [
  'Throw harder than you think you need to. Spin is time.',
  'Bind practice is never wasted.',
  'Slow down: get the string path right before speed.',
  'Watch the yo-yo, not your hands.',
  'Stuck after a dozen tries? Switch tricks and come back.',
  'Fix your string tension before slack tricks.',
  'Change your string every 30–120 minutes of play.',
  'Keep your body still and let your hands do the work.',
  'Short sessions with breaks beat one marathon.',
  'Land it in a combo, not just alone. That\'s when it\'s really yours.',
];
