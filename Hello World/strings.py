course = "Python Programmming"
print(course)

course = "Python Programming"
print(len(course))

print(course[0])
print(course[-1])
print(course[0:3])
print(course[0:])
print(course[:3])
print(course[:])

course = "Python \"Programming"
print(course)

course = "Python \nProgramming"
print(course)

first = "Brian"
last = "Sangura"
full = first + " " + last
print(full)

first = "Brian"
last = "Sangura"
full = f"{first} {last}"
print(full)

course = "Python Programming"
print(course.upper())
print(course.lower())
course = "course.strip()"
print(course.strip())
print(course.find("Pro"))
print(course.replace("Pro", "Prog"))
print("Python" not in course)
course = "Python Programming"
