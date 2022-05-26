CREATE DATABASE UniDev

USE UniDev

-- Cria tabela de usu�rios
CREATE TABLE Users(
	id int IDENTITY(1,1) NOT NULL,
	name nvarchar(255) NOT NULL,
	username nvarchar(255) NOT NULL,
	email nvarchar(100) NULL,
	course nvarchar(100) NULL,
	university nvarchar(255) NULL,
	city nvarchar(255) NULL,
	password nvarchar(max) NOT NULL,
	isActive bit DEFAULT 1,
	createdAt datetimeoffset(7) NOT NULL,
	updatedAt datetimeoffset(7) NOT NULL,
CONSTRAINT PK__Users PRIMARY KEY CLUSTERED(id ASC) WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]) ON [PRIMARY]
ALTER TABLE Users ADD CONSTRAINT UK__Users UNIQUE NONCLUSTERED (username ASC)


-- Cria tabela de problemas
CREATE TABLE Problems(
	id int IDENTITY(1,1) NOT NULL,
	name nvarchar(255) NOT NULL,
	description nvarchar(MAX) NULL,
	codeDefault nvarchar(MAX) NULL,
	isActive bit NOT NULL DEFAULT 1,
	createdUserId int NOT NULL,
	createdAt datetimeoffset(7) NOT NULL,
	updatedAt datetimeoffset(7) NOT NULL,
CONSTRAINT PK__Problems PRIMARY KEY CLUSTERED(id ASC)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]) ON [PRIMARY]
ALTER TABLE Problems ADD  CONSTRAINT UK__Problems UNIQUE NONCLUSTERED (name ASC)
ALTER TABLE Problems WITH CHECK ADD CONSTRAINT FK__Problems__Users FOREIGN KEY(createdUserId) REFERENCES Users(id)


-- Cria tabela de maratonas
CREATE TABLE Marathons(
	id int IDENTITY(1,1) NOT NULL,
	name nvarchar(255) NOT NULL,
	description nvarchar(max) NULL,
	duration int NULL,
	password nvarchar(max) NULL,
	isActive bit DEFAULT 1 NOT NULL,
	createdUserId int NOT NULL,
	createdAt datetimeoffset(7) NOT NULL,
	updatedAt datetimeoffset(7) NOT NULL,
CONSTRAINT PK__Marathons PRIMARY KEY CLUSTERED(id ASC) WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]) ON [PRIMARY]
ALTER TABLE Marathons WITH CHECK ADD CONSTRAINT FK__Marathons__Users FOREIGN KEY(createdUserId) REFERENCES Users(id)


-- Cria tabela de maratonas vs problemas
CREATE TABLE MarathonProblems(
	id int IDENTITY(1,1) NOT NULL,
	marathonId int NOT NULL,
	problemId int NOT NULL,
	orderBy int NOT NULL,
	createdAt datetimeoffset(7) NOT NULL,
	updatedAt datetimeoffset(7) NOT NULL,
CONSTRAINT PK__MarathonProblems PRIMARY KEY CLUSTERED(id ASC) WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]) ON [PRIMARY]
ALTER TABLE MarathonProblems WITH CHECK ADD CONSTRAINT FK__MarathonProblems__Marathons FOREIGN KEY(marathonId) REFERENCES Marathons(id)
ALTER TABLE MarathonProblems WITH CHECK ADD CONSTRAINT FK__MarathonProblems__Problems FOREIGN KEY(problemId) REFERENCES Problems(id)
ALTER TABLE MarathonProblems ADD  CONSTRAINT UK__MarathonProblems UNIQUE NONCLUSTERED (marathonId ASC, problemId ASC)


-- Cria tabela de testes dos problemas
CREATE TABLE ProblemTests(
	id int IDENTITY(1,1) NOT NULL,
	problemId int NOT NULL,
	result nvarchar(MAX) NULL,
	createdAt datetimeoffset(7) NOT NULL,
	updatedAt datetimeoffset(7) NOT NULL,
CONSTRAINT PK__ProblemTests PRIMARY KEY CLUSTERED(id ASC) WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]) ON [PRIMARY]
ALTER TABLE ProblemTests WITH CHECK ADD CONSTRAINT FK__ProblemTests__Problems FOREIGN KEY(problemId) REFERENCES Problems(id)


-- Cria tabela de parametros de entrada dos testes
CREATE TABLE ProblemTestParameters(
	id int IDENTITY(1,1) NOT NULL,
	problemTestId int NOT NULL,
	value nvarchar(MAX) NULL,
	createdAt datetimeoffset(7) NOT NULL,
	updatedAt datetimeoffset(7) NOT NULL,
CONSTRAINT PK__ProblemTestParameters PRIMARY KEY CLUSTERED(id ASC) WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]) ON [PRIMARY]
ALTER TABLE ProblemTestParameters WITH CHECK ADD CONSTRAINT FK__ProblemTestParameters__ProblemTests FOREIGN KEY(problemTestId) REFERENCES ProblemTests(id)


-- Cria tabela de problemas resolvidos por usu�rios
CREATE TABLE ProblemResolved(
	id int IDENTITY(1,1) NOT NULL,
	problemId int NOT NULL,
	userId int NOT NULL,
	time int NOT NULL DEFAULT 0,
	resolvedMarathonId int NULL,
	createdAt datetimeoffset(7) NOT NULL,
	updatedAt datetimeoffset(7) NOT NULL,
CONSTRAINT PK__ProblemResolved PRIMARY KEY CLUSTERED(id ASC) WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]) ON [PRIMARY]
ALTER TABLE ProblemResolved WITH CHECK ADD CONSTRAINT FK__ProblemResolved__Problems FOREIGN KEY(problemId) REFERENCES Problems(id)
ALTER TABLE ProblemResolved WITH CHECK ADD CONSTRAINT FK__ProblemResolved__Users FOREIGN KEY(userId) REFERENCES Users(id)
ALTER TABLE ProblemResolved WITH CHECK ADD CONSTRAINT FK__ProblemResolved__Marathons FOREIGN KEY(resolvedMarathonId) REFERENCES Marathons(id)


-- Cria tabela de maratonas resolvidas por usu�rios
CREATE TABLE MarathonResolved(
	id int IDENTITY(1,1) NOT NULL,
	marathonId int NOT NULL,
	userId int NOT NULL,
	time int NOT NULL DEFAULT 0,
	createdAt datetimeoffset(7) NOT NULL,
	updatedAt datetimeoffset(7) NOT NULL,
CONSTRAINT PK__MarathonResolved PRIMARY KEY CLUSTERED(id ASC) WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]) ON [PRIMARY]
ALTER TABLE MarathonResolved WITH CHECK ADD CONSTRAINT FK__MarathonResolved__Marathons FOREIGN KEY(marathonId) REFERENCES Marathons(id)
ALTER TABLE MarathonResolved WITH CHECK ADD CONSTRAINT FK__MarathonResolved__Users FOREIGN KEY(userId) REFERENCES Users(id)



/*
DROP TABLE ProblemResolved;
DROP TABLE ProblemTestParameters;
DROP TABLE ProblemTests;
DROP TABLE MarathonProblems;
DROP TABLE Marathons;
DROP TABLE MarathonProblems;
DROP TABLE Problems;
DROP TABLE Users;
*/