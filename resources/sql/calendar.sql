USE [WEBautomationCS]
GO

/****** Object:  Table [dbo].[calendar]    Script Date: 19.12.2017 14:23:03 ******/

CREATE TABLE [dbo].[calendar](
	[id_calendar] [int] IDENTITY(1,1) NOT NULL,
	[id_opcdatapoint] [int] NULL,
	[name] [varchar](150) NOT NULL,
	[id_calendargroup] [int] NULL,
	[id_scenegroup] [int] NULL,
	[active] [bit] NOT NULL,
 CONSTRAINT [PK_calendar] PRIMARY KEY CLUSTERED 
(
	[id_calendar] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO

ALTER TABLE [dbo].[calendar] ADD  CONSTRAINT [DF_calendar_active]  DEFAULT ((1)) FOR [active]
GO

ALTER TABLE [dbo].[calendar]  WITH CHECK ADD  CONSTRAINT [FK_calendar_opcdatapoint] FOREIGN KEY([id_opcdatapoint])
REFERENCES [dbo].[opcdatapoint] ([id_opcdatapoint])
ON UPDATE CASCADE
ON DELETE CASCADE
GO

ALTER TABLE [dbo].[calendar] CHECK CONSTRAINT [FK_calendar_opcdatapoint]
GO

ALTER TABLE [dbo].[calendar]  WITH CHECK ADD  CONSTRAINT [FK_calendar_scenegroup] FOREIGN KEY([id_scenegroup])
REFERENCES [dbo].[scenegroup] ([id_scenegroup])
ON UPDATE CASCADE
ON DELETE CASCADE
GO

ALTER TABLE [dbo].[calendar] CHECK CONSTRAINT [FK_calendar_scenegroup]
GO

/****** Object:  Table [dbo].[calendargroup]    Script Date: 19.12.2017 14:24:42 ******/

CREATE TABLE [dbo].[calendargroup](
	[id_calendargroup] [int] IDENTITY(1,1) NOT NULL,
	[name] [varchar](50) NOT NULL,
 CONSTRAINT [PK_calendargroup] PRIMARY KEY CLUSTERED 
(
	[id_calendargroup] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO

ALTER TABLE [dbo].[calendar]  WITH CHECK ADD  CONSTRAINT [FK_calendar_calendargroup] FOREIGN KEY([id_calendargroup])
REFERENCES [dbo].[calendargroup] ([id_calendargroup])
ON UPDATE CASCADE
ON DELETE SET NULL
GO

ALTER TABLE [dbo].[calendar] CHECK CONSTRAINT [FK_calendar_calendargroup]
GO
/****** Object:  Table [dbo].[calendarevent]    Script Date: 19.12.2017 14:24:00 ******/

CREATE TABLE [dbo].[calendarevent](
	[id_calendarevent] [varchar](250) NOT NULL,
	[id_calendar] [int] NOT NULL,
	[dtstart] [datetime] NOT NULL,
	[vstart] [varchar](45) NULL,
	[sstart] [int] NULL,
	[dtend] [datetime] NOT NULL,
	[vend] [varchar](45) NULL,
	[send] [int] NULL,
	[summary] [varchar](500) NULL,
 CONSTRAINT [PK_calendarevent] PRIMARY KEY CLUSTERED 
(
	[id_calendarevent] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO

ALTER TABLE [dbo].[calendarevent]  WITH CHECK ADD  CONSTRAINT [FK_calendarevent_calendar] FOREIGN KEY([id_calendar])
REFERENCES [dbo].[calendar] ([id_calendar])
ON UPDATE CASCADE
ON DELETE CASCADE
GO

ALTER TABLE [dbo].[calendarevent] CHECK CONSTRAINT [FK_calendarevent_calendar]
GO

/****** Object:  Table [dbo].[calendarrrule]    Script Date: 19.12.2017 14:25:41 ******/

CREATE TABLE [dbo].[calendarrrule](
	[id_calendarrrule] [int] IDENTITY(1,1) NOT NULL,
	[id_calendarevent] [varchar](250) NULL,
	[freq] [varchar](10) NULL,
	[intervall] [int] NULL,
	[until] [datetime] NULL,
	[count] [int] NULL,
	[byday] [varchar](250) NULL,
 CONSTRAINT [PK_calendarrrule] PRIMARY KEY CLUSTERED 
(
	[id_calendarrrule] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO

ALTER TABLE [dbo].[calendarrrule]  WITH CHECK ADD  CONSTRAINT [FK_calendarrrule_calendarevent] FOREIGN KEY([id_calendarevent])
REFERENCES [dbo].[calendarevent] ([id_calendarevent])
ON UPDATE CASCADE
ON DELETE CASCADE
GO

ALTER TABLE [dbo].[calendarrrule] CHECK CONSTRAINT [FK_calendarrrule_calendarevent]
GO

/****** Object:  Table [dbo].[calendarexdate]    Script Date: 19.12.2017 14:24:26 ******/

CREATE TABLE [dbo].[calendarexdate](
	[id_calendarexdate] [int] IDENTITY(1,1) NOT NULL,
	[id_calendarrrule] [int] NOT NULL,
	[datetime] [datetime] NOT NULL,
 CONSTRAINT [PK_calendarexdate] PRIMARY KEY CLUSTERED 
(
	[id_calendarexdate] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO

ALTER TABLE [dbo].[calendarexdate]  WITH CHECK ADD  CONSTRAINT [FK_calendarexdate_calendarrrule] FOREIGN KEY([id_calendarrrule])
REFERENCES [dbo].[calendarrrule] ([id_calendarrrule])
ON UPDATE CASCADE
ON DELETE CASCADE
GO

ALTER TABLE [dbo].[calendarexdate] CHECK CONSTRAINT [FK_calendarexdate_calendarrrule]
GO

/****** Object:  Table [dbo].[calendartemplate]    Script Date: 19.12.2017 14:26:08 ******/

CREATE TABLE [dbo].[calendartemplate](
	[id_calendartemplate] [int] IDENTITY(1,1) NOT NULL,
	[id_calendar] [int] NULL,
	[summary] [varchar](500) NULL,
 CONSTRAINT [PK_calendartemplate] PRIMARY KEY CLUSTERED 
(
	[id_calendartemplate] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO

ALTER TABLE [dbo].[calendartemplate]  WITH CHECK ADD  CONSTRAINT [FK_calendartemplate_calendar] FOREIGN KEY([id_calendar])
REFERENCES [dbo].[calendar] ([id_calendar])
ON UPDATE CASCADE
ON DELETE CASCADE
GO

ALTER TABLE [dbo].[calendartemplate] CHECK CONSTRAINT [FK_calendartemplate_calendar]
GO

/****** Object:  Table [dbo].[calendartemplateevent]    Script Date: 19.12.2017 14:26:30 ******/

CREATE TABLE [dbo].[calendartemplateevent](
	[id_calendartemplateevent] [int] IDENTITY(1,1) NOT NULL,
	[id_calendartemplate] [int] NOT NULL,
	[tstart] [time](7) NOT NULL,
	[vstart] [varchar](45) NULL,
	[tend] [time](7) NOT NULL,
	[vend] [varchar](45) NULL,
 CONSTRAINT [PK_calendartemplateevent] PRIMARY KEY CLUSTERED 
(
	[id_calendartemplateevent] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO

ALTER TABLE [dbo].[calendartemplateevent]  WITH CHECK ADD  CONSTRAINT [FK_calendartemplateevent_calendartemplate] FOREIGN KEY([id_calendartemplate])
REFERENCES [dbo].[calendartemplate] ([id_calendartemplate])
ON UPDATE CASCADE
ON DELETE CASCADE
GO

ALTER TABLE [dbo].[calendartemplateevent] CHECK CONSTRAINT [FK_calendartemplateevent_calendartemplate]
GO



