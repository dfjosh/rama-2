# Initialize
points_remaining = 501
next_throws = ("60", "60", "60")
possible_throws = range(1, 21) + \
	[x * 2 for x in range(1, 21)] + \
	[x * 3 for x in range(1, 21)] + \
	[25, 50]

# Intro
print ""
print "/////////////////////////////////"
print "// Welcome to Dart Calculator! //"
print "/////////////////////////////////"
print ""
print "After the prompt 'prev:', enter"
print "the scores of your last throw(s)."
print "Separate them with spaces,"
print "maximum three scores per turn."
print "Example:"
print "prev:\t60 5 20"
print "then press [Return]."
print "Dart Calculator will keep track"
print "of points remaining (init. 501)"
print "and suggest your next throws."
print ""
print "points:\t501"
print "next:\t60 60 60"
print "-" * 33

def getInput():
	prev_throws = [0]
	prev_throws = raw_input("prev:\t")
	prev_throws = prev_throws.split()
	prev_throws = [int(x) for x in prev_throws]
	if len(prev_throws) > 3:
		print "Please enter 3 scores separated by spaces."
		getInput()
	return prev_throws

# Decide how to proceed based on points
def calculate(prev_throws, points_remaining):
	global next_throws
	prev_throws = sum(prev_throws)
	points_remaining -= prev_throws
	if points_remaining > 170:
		next_throws = ("60", "60", "60")
	elif points_remaining <= 170 and points_remaining > 100:
		throw1 = recursCalc(points_remaining)
		throw2 = recursCalc(points_remaining - throw1, leave=True)
		throw3 = points_remaining - throw1 - throw2
		next_throws = [throw1, throw2, throw3]
	elif points_remaining <= 100 and points_remaining > 50:
		throw1 = recursCalc(points_remaining, leave=True)
		throw2 = points_remaining - throw1
		next_throws = [throw1, throw2]
	elif points_remaining <= 50 and points_remaining > 1:
		if points_remaining % 2 == 0 and points_remaining in possible_throws:
			next_throws = [points_remaining]
		else:
			throw1 = recursCalc(points_remaining, leave=True)
			throw2 = points_remaining - throw1
			next_throws = [throw1, throw2]
	elif points_remaining == 0:
		next_throws = ("Game complete!")
	elif points_remaining < 0 or points_remaining == 1:
		points_remaining += prev_throws
	return points_remaining, next_throws

# Recursively calculate the next throws	
def recursCalc(points_remaining, value=60, leave=False):
	global throw # omg I don't know why, but this makes it work: http://eli.thegreenplace.net/2011/05/15/understanding-unboundlocalerror-in-python
	test = points_remaining - value
	if not leave:
		if value in possible_throws and test > 2:
			throw = value
		else:
			recursCalc(points_remaining, value - 1)
	else:
		if value in possible_throws and test > 2 and test % 2 == 0:
			# placing global throw here throws synatx warning: http://effbot.org/zone/syntaxwarning-name-assigned-to-before-global-declaration.htm
			throw = value
		else:
			recursCalc(points_remaining, value - 1, leave=True)
	return throw

# Start the loop
while points_remaining != 0:
	
	# Get the input
	prev_throws = getInput()
	
	# Calculate output
	points_remaining, next_throws = calculate(prev_throws, points_remaining)
	
	# Print the output
	print "points\t%i" % points_remaining
	if points_remaining != 0:
		print "next:\t",
		for throw in next_throws:
			print "%s " % throw,
		print "\n",
	else:
		print next_throws	# should be a completion string
		print "Start again? [y/n]"
		choice = raw_input("> ")
		if choice == "y":
			print "+" * 33
			points_remaining = 501
			next_throws = ("T20", "T20", "T20")
			print "points:\t501"
			print "next:\tT20 T20 T20"
		else:
			continue

	print "-" * 33