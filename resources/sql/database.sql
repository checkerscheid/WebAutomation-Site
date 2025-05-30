USE [WebAutomation]
GO
/****** Object:  Table [dbo].[alarm]    Script Date: 12.07.2024 15:19:33 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[alarm](
	[id_alarm] [int] IDENTITY(1,1) NOT NULL,
	[id_dp] [int] NOT NULL,
	[id_alarmgroup] [int] NULL,
	[id_alarmgroups1] [int] NULL,
	[id_alarmgroups2] [int] NULL,
	[id_alarmgroups3] [int] NULL,
	[id_alarmgroups4] [int] NULL,
	[id_alarmgroups5] [int] NULL,
	[id_alarmtype] [int] NOT NULL,
	[id_alarmcondition] [int] NOT NULL,
	[text] [varchar](150) NULL,
	[min] [varchar](50) NOT NULL,
	[max] [varchar](50) NULL,
	[delay] [int] NOT NULL,
	[link] [varchar](500) NULL,
 CONSTRAINT [PK_alarm] PRIMARY KEY CLUSTERED 
(
	[id_alarm] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[alarmcondition]    Script Date: 12.07.2024 15:19:33 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[alarmcondition](
	[id_alarmcondition] [int] IDENTITY(1,1) NOT NULL,
	[condition] [varchar](50) NOT NULL,
	[description] [varchar](250) NOT NULL,
 CONSTRAINT [PK_alarmcondition] PRIMARY KEY CLUSTERED 
(
	[id_alarmcondition] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[alarmgroup]    Script Date: 12.07.2024 15:19:33 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[alarmgroup](
	[id_alarmgroup] [int] IDENTITY(1,1) NOT NULL,
	[name] [varchar](250) NOT NULL,
 CONSTRAINT [PK_alarmgroup] PRIMARY KEY CLUSTERED 
(
	[id_alarmgroup] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[alarmgroups1]    Script Date: 12.07.2024 15:19:33 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[alarmgroups1](
	[id_alarmgroups1] [int] IDENTITY(1,1) NOT NULL,
	[name] [varchar](50) NOT NULL,
 CONSTRAINT [PK_alarmgroups1] PRIMARY KEY CLUSTERED 
(
	[id_alarmgroups1] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[alarmgroups2]    Script Date: 12.07.2024 15:19:33 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[alarmgroups2](
	[id_alarmgroups2] [int] IDENTITY(1,1) NOT NULL,
	[name] [varchar](50) NOT NULL,
 CONSTRAINT [PK_alarmgroups2] PRIMARY KEY CLUSTERED 
(
	[id_alarmgroups2] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[alarmgroups3]    Script Date: 12.07.2024 15:19:33 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[alarmgroups3](
	[id_alarmgroups3] [int] IDENTITY(1,1) NOT NULL,
	[name] [varchar](50) NOT NULL,
 CONSTRAINT [PK_alarmgroups3] PRIMARY KEY CLUSTERED 
(
	[id_alarmgroups3] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[alarmgroups4]    Script Date: 12.07.2024 15:19:33 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[alarmgroups4](
	[id_alarmgroups4] [int] IDENTITY(1,1) NOT NULL,
	[name] [varchar](50) NOT NULL,
 CONSTRAINT [PK_alarmgroups4] PRIMARY KEY CLUSTERED 
(
	[id_alarmgroups4] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[alarmgroups5]    Script Date: 12.07.2024 15:19:33 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[alarmgroups5](
	[id_alarmgroups5] [int] IDENTITY(1,1) NOT NULL,
	[name] [varchar](50) NOT NULL,
 CONSTRAINT [PK_alarmgroups5] PRIMARY KEY CLUSTERED 
(
	[id_alarmgroups5] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[alarmhistoric]    Script Date: 12.07.2024 15:19:33 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[alarmhistoric](
	[id_alarm] [int] NULL,
	[come] [datetime] NULL,
	[gone] [datetime] NULL,
	[quit] [datetime] NULL,
	[quitfrom] [varchar](150) NULL,
	[quittext] [varchar](250) NULL,
	[text] [varchar](100) NULL
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[alarmtoemail]    Script Date: 12.07.2024 15:19:33 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[alarmtoemail](
	[id_alarmtoemail] [int] IDENTITY(1,1) NOT NULL,
	[id_alarm] [int] NULL,
	[id_email] [int] NULL,
	[minutes] [int] NULL,
 CONSTRAINT [PK_alarmtoemail] PRIMARY KEY CLUSTERED 
(
	[id_alarmtoemail] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[alarmtype]    Script Date: 12.07.2024 15:19:33 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[alarmtype](
	[id_alarmtype] [int] IDENTITY(1,1) NOT NULL,
	[name] [varchar](50) NOT NULL,
	[autoquit] [bit] NOT NULL,
 CONSTRAINT [PK_alarmtype] PRIMARY KEY CLUSTERED 
(
	[id_alarmtype] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[calendar]    Script Date: 12.07.2024 15:19:33 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[calendar](
	[id_calendar] [int] IDENTITY(1,1) NOT NULL,
	[id_dp] [int] NULL,
	[name] [varchar](150) NOT NULL,
	[id_calendargroup] [int] NULL,
	[id_scenegroup] [int] NULL,
	[active] [bit] NOT NULL,
 CONSTRAINT [PK_calendar] PRIMARY KEY CLUSTERED 
(
	[id_calendar] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[calendarevent]    Script Date: 12.07.2024 15:19:33 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
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
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[calendareventreminder]    Script Date: 12.07.2024 15:19:33 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[calendareventreminder](
	[id_calendareventreminder] [int] IDENTITY(1,1) NOT NULL,
	[id_calendarevent] [varchar](250) NOT NULL,
	[minutes] [int] NOT NULL,
	[vreminder] [varchar](45) NULL,
	[sreminder] [int] NULL,
 CONSTRAINT [PK_calendareventreminder] PRIMARY KEY CLUSTERED 
(
	[id_calendareventreminder] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[calendarexdate]    Script Date: 12.07.2024 15:19:33 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[calendarexdate](
	[id_calendarexdate] [int] IDENTITY(1,1) NOT NULL,
	[id_calendarrrule] [int] NOT NULL,
	[datetime] [datetime] NOT NULL,
 CONSTRAINT [PK_calendarexdate] PRIMARY KEY CLUSTERED 
(
	[id_calendarexdate] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[calendargroup]    Script Date: 12.07.2024 15:19:33 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[calendargroup](
	[id_calendargroup] [int] IDENTITY(1,1) NOT NULL,
	[name] [varchar](50) NOT NULL,
 CONSTRAINT [PK_calendargroup] PRIMARY KEY CLUSTERED 
(
	[id_calendargroup] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[calendarrrule]    Script Date: 12.07.2024 15:19:33 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
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
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[calendartemplate]    Script Date: 12.07.2024 15:19:33 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[calendartemplate](
	[id_calendartemplate] [int] IDENTITY(1,1) NOT NULL,
	[id_calendar] [int] NULL,
	[summary] [varchar](500) NULL,
 CONSTRAINT [PK_calendartemplate] PRIMARY KEY CLUSTERED 
(
	[id_calendartemplate] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[calendartemplateevent]    Script Date: 12.07.2024 15:19:33 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
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
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[cfg]    Script Date: 12.07.2024 15:19:33 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[cfg](
	[id_cfg] [int] IDENTITY(1,1) NOT NULL,
	[id_user] [int] NULL,
	[key] [varchar](50) NOT NULL,
	[value] [varchar](50) NULL,
 CONSTRAINT [PK_cfg] PRIMARY KEY CLUSTERED 
(
	[id_cfg] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[cookie]    Script Date: 12.07.2024 15:19:33 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[cookie](
	[id_cookie] [varchar](32) NOT NULL,
	[id_user] [int] NOT NULL,
	[created] [datetime] NOT NULL,
	[updated] [datetime] NULL,
	[version] [int] NOT NULL,
 CONSTRAINT [PK_cookie] PRIMARY KEY CLUSTERED 
(
	[id_cookie] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[d1mini]    Script Date: 12.07.2024 15:19:33 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[d1mini](
	[id_d1mini] [int] IDENTITY(1,1) NOT NULL,
	[id_d1minigroup] [int] NULL,
	[name] [varchar](50) NOT NULL,
	[description] [varchar](250) NULL,
	[version] [varchar](50) NULL,
	[ip] [varchar](15) NULL,
	[mac] [varchar](12) NULL,
	[active] [bit] NOT NULL,
 CONSTRAINT [PK_d1mini] PRIMARY KEY CLUSTERED 
(
	[id_d1mini] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[d1minigroup]    Script Date: 12.07.2024 15:19:33 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[d1minigroup](
	[id_d1minigroup] [int] IDENTITY(1,1) NOT NULL,
	[name] [varchar](50) NOT NULL,
	[description] [varchar](250) NULL,
	[active] [bit] NOT NULL,
 CONSTRAINT [PK_d1minigroup] PRIMARY KEY CLUSTERED 
(
	[id_d1minigroup] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[dp]    Script Date: 12.07.2024 15:19:33 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[dp](
	[id_dp] [int] IDENTITY(1,1) NOT NULL,
	[id_dpgroup] [int] NOT NULL,
	[id_opcdatapoint] [int] NULL,
	[id_mqtttopic] [int] NULL,
	[name] [varchar](250) NOT NULL,
	[description] [varchar](500) NULL,
	[unit] [varchar](250) NULL,
	[nks] [int] NULL,
	[min] [decimal](9, 2) NOT NULL,
	[max] [decimal](9, 2) NOT NULL,
	[factor] [decimal](10, 5) NOT NULL,
	[usergroupwrite] [int] NULL,
	[active] [bit] NOT NULL,
 CONSTRAINT [PK_dp] PRIMARY KEY CLUSTERED 
(
	[id_dp] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[dpgroup]    Script Date: 12.07.2024 15:19:33 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[dpgroup](
	[id_dpgroup] [int] IDENTITY(1,1) NOT NULL,
	[id_dpnamespace] [int] NOT NULL,
	[name] [varchar](250) NOT NULL,
	[description] [varchar](500) NOT NULL,
	[usergroupwrite] [int] NULL,
	[active] [bit] NOT NULL,
 CONSTRAINT [PK_dpgroup] PRIMARY KEY CLUSTERED 
(
	[id_dpgroup] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[dpnamespace]    Script Date: 12.07.2024 15:19:33 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[dpnamespace](
	[id_dpnamespace] [int] IDENTITY(1,1) NOT NULL,
	[name] [varchar](250) NOT NULL,
	[description] [varchar](500) NULL,
	[usergroupwrite] [int] NULL,
	[active] [bit] NOT NULL,
 CONSTRAINT [PK_dpnamespace] PRIMARY KEY CLUSTERED 
(
	[id_dpnamespace] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[email]    Script Date: 12.07.2024 15:19:33 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[email](
	[id_email] [int] IDENTITY(1,1) NOT NULL,
	[address] [varchar](150) NULL,
	[name] [varchar](150) NULL,
	[lastname] [varchar](150) NULL,
	[ticketmail] [bit] NULL,
	[active] [bit] NULL,
	[duration] [int] NULL,
	[phone] [varchar](150) NULL,
	[phone2] [nchar](150) NULL,
	[etc] [varchar](150) NULL,
	[sms] [bit] NOT NULL,
 CONSTRAINT [PK_email] PRIMARY KEY CLUSTERED 
(
	[id_email] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[emailhistoric]    Script Date: 12.07.2024 15:19:33 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[emailhistoric](
	[email] [varchar](150) NOT NULL,
	[send] [datetime] NOT NULL,
	[subject] [text] NOT NULL,
	[message] [text] NOT NULL,
	[error] [text] NULL
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[gsync]    Script Date: 12.07.2024 15:19:33 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[gsync](
	[id_gsync] [varchar](250) NOT NULL,
	[id_calendar] [int] NOT NULL,
	[etagcalendarlist] [varchar](250) NULL,
	[etagcalendar] [varchar](250) NULL,
	[etagevents] [varchar](250) NULL,
	[active] [bit] NOT NULL,
	[defaultstart] [int] NULL,
	[defaultend] [int] NULL,
	[defaultreminder] [int] NULL,
 CONSTRAINT [PK_gsync_1] PRIMARY KEY CLUSTERED 
(
	[id_gsync] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[gsyncevent]    Script Date: 12.07.2024 15:19:33 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[gsyncevent](
	[id_gsyncevent] [varchar](250) NOT NULL,
	[etagevent] [varchar](250) NULL,
	[flagnew] [bit] NOT NULL,
	[flagupdate] [bit] NOT NULL,
	[flagdelete] [bit] NOT NULL,
	[uid] [varchar](250) NULL,
 CONSTRAINT [PK_gsyncevent] PRIMARY KEY CLUSTERED 
(
	[id_gsyncevent] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[mqttbroker]    Script Date: 12.07.2024 15:19:33 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[mqttbroker](
	[id_mqttbroker] [int] IDENTITY(1,1) NOT NULL,
	[name] [varchar](50) NOT NULL,
	[description] [varchar](250) NULL,
	[address] [varchar](50) NOT NULL,
	[port] [int] NOT NULL,
 CONSTRAINT [PK_mqttdevice] PRIMARY KEY CLUSTERED 
(
	[id_mqttbroker] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[mqttgroup]    Script Date: 12.07.2024 15:19:33 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[mqttgroup](
	[id_mqttgroup] [int] IDENTITY(1,1) NOT NULL,
	[id_mqttbroker] [int] NOT NULL,
	[name] [varchar](50) NOT NULL,
	[description] [varchar](250) NULL,
	[active] [bit] NOT NULL,
 CONSTRAINT [PK_mqttgroup] PRIMARY KEY CLUSTERED 
(
	[id_mqttgroup] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[mqtttopic]    Script Date: 12.07.2024 15:19:33 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[mqtttopic](
	[id_mqtttopic] [int] IDENTITY(1,1) NOT NULL,
	[id_mqttgroup] [int] NOT NULL,
	[topic] [varchar](250) NOT NULL,
	[json] [varchar](500) NULL,
	[id_d1mini] [int] NULL,
	[id_shelly] [int] NULL,
	[readable] [bit] NOT NULL,
	[writeable] [bit] NOT NULL,
 CONSTRAINT [PK_mqtttopic] PRIMARY KEY CLUSTERED 
(
	[id_mqtttopic] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[opcdatapoint]    Script Date: 12.07.2024 15:19:33 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[opcdatapoint](
	[id_opcdatapoint] [int] IDENTITY(1,1) NOT NULL,
	[id_opcgroup] [int] NOT NULL,
	[name] [varchar](250) NOT NULL,
	[opcname] [varchar](250) NOT NULL,
	[description] [varchar](100) NULL,
	[forcetype] [varchar](10) NULL,
	[startuptype] [varchar](10) NULL,
	[startupquality] [varchar](100) NULL,
	[active] [bit] NOT NULL,
 CONSTRAINT [PK_opcdatapoint] PRIMARY KEY CLUSTERED 
(
	[id_opcdatapoint] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[opcgroup]    Script Date: 12.07.2024 15:19:33 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[opcgroup](
	[id_opcgroup] [int] IDENTITY(1,1) NOT NULL,
	[id_opcserver] [int] NOT NULL,
	[name] [varchar](50) NOT NULL,
	[duration] [int] NOT NULL,
	[active] [bit] NOT NULL,
 CONSTRAINT [PK_opcgroup] PRIMARY KEY CLUSTERED 
(
	[id_opcgroup] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[opcserver]    Script Date: 12.07.2024 15:19:33 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[opcserver](
	[id_opcserver] [int] IDENTITY(1,1) NOT NULL,
	[server] [varchar](50) NULL,
	[name] [varchar](50) NOT NULL,
	[progid] [varchar](50) NOT NULL,
	[clsid] [varchar](50) NOT NULL,
	[active] [bit] NOT NULL,
 CONSTRAINT [PK_opcserver] PRIMARY KEY CLUSTERED 
(
	[id_opcserver] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[rest]    Script Date: 12.07.2024 15:19:33 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[rest](
	[id_rest] [int] IDENTITY(1,1) NOT NULL,
	[id_shelly] [int] NULL,
	[id_d1mini] [int] NULL,
	[id_onoff] [int] NULL,
	[id_temp] [int] NULL,
	[id_hum] [int] NULL,
	[id_ldr] [int] NULL,
	[id_light] [int] NULL,
	[id_relais] [int] NULL,
	[id_rain] [int] NULL,
	[id_moisture] [int] NULL,
	[id_vol] [int] NULL,
	[id_window] [int] NULL,
 CONSTRAINT [PK_rest] PRIMARY KEY CLUSTERED 
(
	[id_rest] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[router]    Script Date: 12.07.2024 15:19:33 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[router](
	[id_router] [int] IDENTITY(1,1) NOT NULL,
	[id_dp] [int] NOT NULL,
	[id_to] [int] NOT NULL,
 CONSTRAINT [PK_router] PRIMARY KEY CLUSTERED 
(
	[id_router] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[scene]    Script Date: 12.07.2024 15:19:33 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[scene](
	[id_scene] [int] IDENTITY(1,1) NOT NULL,
	[id_scenegroup] [int] NULL,
	[name] [varchar](250) NOT NULL,
 CONSTRAINT [PK_scene] PRIMARY KEY CLUSTERED 
(
	[id_scene] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[scenegroup]    Script Date: 12.07.2024 15:19:33 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[scenegroup](
	[id_scenegroup] [int] IDENTITY(1,1) NOT NULL,
	[name] [varchar](250) NOT NULL,
 CONSTRAINT [PK_scenegroup] PRIMARY KEY CLUSTERED 
(
	[id_scenegroup] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[scenevalue]    Script Date: 12.07.2024 15:19:33 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[scenevalue](
	[id_scenevalue] [int] IDENTITY(1,1) NOT NULL,
	[id_scene] [int] NOT NULL,
	[id_dp] [int] NOT NULL,
	[value] [varchar](50) NULL,
 CONSTRAINT [PK_scenevalue] PRIMARY KEY CLUSTERED 
(
	[id_scenevalue] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[shelly]    Script Date: 12.07.2024 15:19:33 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[shelly](
	[id_shelly] [int] IDENTITY(1,1) NOT NULL,
	[id_shellygroup] [int] NULL,
	[id_shellyroom] [int] NULL,
	[name] [varchar](50) NOT NULL,
	[ip] [varchar](15) NOT NULL,
	[mac] [varchar](12) NULL,
	[type] [varchar](50) NULL,
	[un] [varchar](50) NULL,
	[pw] [varchar](50) NULL,
	[mqtt_active] [bit] NOT NULL,
	[mqtt_server] [varchar](150) NULL,
	[mqtt_id] [varchar](50) NULL,
	[mqtt_prefix] [varchar](50) NULL,
	[mqtt_writeable] [bit] NULL,
	[autooff] [int] NOT NULL,
	[lastcontact] [datetime] NULL,
	[active] [bit] NOT NULL,
 CONSTRAINT [PK_shelly] PRIMARY KEY CLUSTERED 
(
	[id_shelly] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[shellygroup]    Script Date: 12.07.2024 15:19:33 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[shellygroup](
	[id_shellygroup] [int] IDENTITY(1,1) NOT NULL,
	[name] [varchar](50) NOT NULL,
 CONSTRAINT [PK_shellygroup] PRIMARY KEY CLUSTERED 
(
	[id_shellygroup] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[shellyroom]    Script Date: 12.07.2024 15:19:33 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[shellyroom](
	[id_shellyroom] [int] IDENTITY(1,1) NOT NULL,
	[name] [varchar](200) NOT NULL,
 CONSTRAINT [PK_shellyroom] PRIMARY KEY CLUSTERED 
(
	[id_shellyroom] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[trend]    Script Date: 12.07.2024 15:19:33 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[trend](
	[id_trend] [int] IDENTITY(1,1) NOT NULL,
	[id_dp] [int] NOT NULL,
	[id_trendgroup] [int] NULL,
	[name] [varchar](250) NOT NULL,
	[intervall] [int] NOT NULL,
	[max] [int] NOT NULL,
	[maxAge] [int] NOT NULL,
	[active] [bit] NOT NULL,
 CONSTRAINT [PK_trend] PRIMARY KEY CLUSTERED 
(
	[id_trend] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[trendcfg]    Script Date: 12.07.2024 15:19:33 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[trendcfg](
	[id_trendcfg] [int] IDENTITY(1,1) NOT NULL,
	[id_user] [int] NULL,
	[time] [varchar](20) NULL,
	[timefrom] [datetime] NULL,
	[timeto] [datetime] NULL,
	[timeday] [datetime] NULL,
	[choosentime] [varchar](20) NULL,
	[name] [varchar](250) NOT NULL,
	[useminmax] [varchar](50) NULL,
	[only1axes] [bit] NULL,
 CONSTRAINT [PK_trendcfg] PRIMARY KEY CLUSTERED 
(
	[id_trendcfg] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[trendcfgtrend]    Script Date: 12.07.2024 15:19:33 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[trendcfgtrend](
	[id_trendcfgtrend] [int] IDENTITY(1,1) NOT NULL,
	[id_trendcfg] [int] NULL,
	[id_trend] [int] NULL,
 CONSTRAINT [PK_trendcfgtrend] PRIMARY KEY CLUSTERED 
(
	[id_trendcfgtrend] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[trendgroup]    Script Date: 12.07.2024 15:19:33 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[trendgroup](
	[id_trendgroup] [int] IDENTITY(1,1) NOT NULL,
	[name] [varchar](250) NULL,
 CONSTRAINT [PK_trendgroup] PRIMARY KEY CLUSTERED 
(
	[id_trendgroup] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[trendvalue]    Script Date: 12.07.2024 15:19:33 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[trendvalue](
	[id_trend] [int] NOT NULL,
	[time] [datetime] NOT NULL,
	[value] [varchar](50) NULL
) ON [PRIMARY]
GO
/****** Object:  Index [IX_trend]    Script Date: 12.07.2024 15:19:33 ******/
CREATE CLUSTERED INDEX [IX_trend] ON [dbo].[trendvalue]
(
	[id_trend] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, DROP_EXISTING = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[user]    Script Date: 12.07.2024 15:19:33 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[user](
	[id_user] [int] IDENTITY(1,1) NOT NULL,
	[id_usergroup] [int] NULL,
	[id_email] [int] NULL,
	[login] [varchar](50) NULL,
	[name] [varchar](50) NULL,
	[lastname] [varchar](50) NULL,
	[password] [varchar](50) NULL,
	[static] [bit] NOT NULL,
	[autologoff] [int] NOT NULL,
	[domainuser] [bit] NOT NULL,
	[showpopup] [bit] NOT NULL,
	[startpage] [varchar](100) NULL,
 CONSTRAINT [PK_user] PRIMARY KEY CLUSTERED 
(
	[id_user] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[useractivity]    Script Date: 12.07.2024 15:19:33 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[useractivity](
	[username] [varchar](100) NULL,
	[datapoint] [varchar](250) NULL,
	[writetime] [datetime] NULL,
	[newvalue] [varchar](45) NULL,
	[oldvalue] [varchar](45) NULL
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[usergroup]    Script Date: 12.07.2024 15:19:33 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[usergroup](
	[id_usergroup] [int] IDENTITY(1,1) NOT NULL,
	[name] [varchar](50) NULL,
	[order] [tinyint] NULL,
	[static] [bit] NULL,
 CONSTRAINT [PK_usergroup] PRIMARY KEY CLUSTERED 
(
	[id_usergroup] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[visitors]    Script Date: 12.07.2024 15:19:33 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[visitors](
	[id_user] [int] NULL,
	[ip] [varchar](50) NULL,
	[host] [varchar](100) NULL,
	[page] [varchar](100) NULL,
	[datetime] [datetime] NULL
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[webpages]    Script Date: 12.07.2024 15:19:33 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[webpages](
	[id_webpages] [int] IDENTITY(1,1) NOT NULL,
	[id_parent_webpage] [int] NULL,
	[position] [int] NULL,
	[id_src] [nvarchar](250) NULL,
	[src] [nvarchar](50) NULL,
	[name] [nvarchar](250) NULL,
	[usergroupread] [int] NULL,
	[static] [bit] NULL,
	[inwork] [bit] NOT NULL,
 CONSTRAINT [PK_webpages] PRIMARY KEY CLUSTERED 
(
	[id_webpages] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Index [IX_alarmtoemail]    Script Date: 12.07.2024 15:19:33 ******/
CREATE UNIQUE NONCLUSTERED INDEX [IX_alarmtoemail] ON [dbo].[alarmtoemail]
(
	[id_alarm] ASC,
	[id_email] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, IGNORE_DUP_KEY = ON, DROP_EXISTING = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
GO
SET ANSI_PADDING ON
GO
/****** Object:  Index [IX_cfg]    Script Date: 12.07.2024 15:19:33 ******/
CREATE UNIQUE NONCLUSTERED INDEX [IX_cfg] ON [dbo].[cfg]
(
	[id_user] ASC,
	[key] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, IGNORE_DUP_KEY = OFF, DROP_EXISTING = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
GO
SET ANSI_PADDING ON
GO
/****** Object:  Index [IX_d1mini]    Script Date: 12.07.2024 15:19:33 ******/
CREATE UNIQUE NONCLUSTERED INDEX [IX_d1mini] ON [dbo].[d1mini]
(
	[name] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, IGNORE_DUP_KEY = OFF, DROP_EXISTING = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
GO
SET ANSI_PADDING ON
GO
/****** Object:  Index [IX_dp]    Script Date: 12.07.2024 15:19:33 ******/
CREATE UNIQUE NONCLUSTERED INDEX [IX_dp] ON [dbo].[dp]
(
	[name] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, IGNORE_DUP_KEY = OFF, DROP_EXISTING = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
GO
SET ANSI_PADDING ON
GO
/****** Object:  Index [IX_dpgroup]    Script Date: 12.07.2024 15:19:33 ******/
CREATE UNIQUE NONCLUSTERED INDEX [IX_dpgroup] ON [dbo].[dpgroup]
(
	[id_dpnamespace] ASC,
	[name] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, IGNORE_DUP_KEY = OFF, DROP_EXISTING = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
GO
SET ANSI_PADDING ON
GO
/****** Object:  Index [IX_dpnamespace]    Script Date: 12.07.2024 15:19:33 ******/
CREATE UNIQUE NONCLUSTERED INDEX [IX_dpnamespace] ON [dbo].[dpnamespace]
(
	[name] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, IGNORE_DUP_KEY = OFF, DROP_EXISTING = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
GO
SET ANSI_PADDING ON
GO
/****** Object:  Index [IX_email]    Script Date: 12.07.2024 15:19:33 ******/
CREATE UNIQUE NONCLUSTERED INDEX [IX_email] ON [dbo].[email]
(
	[address] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, IGNORE_DUP_KEY = OFF, DROP_EXISTING = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
GO
SET ANSI_PADDING ON
GO
/****** Object:  Index [IX_mqtttopic]    Script Date: 12.07.2024 15:19:33 ******/
CREATE UNIQUE NONCLUSTERED INDEX [IX_mqtttopic] ON [dbo].[mqtttopic]
(
	[topic] ASC,
	[json] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, IGNORE_DUP_KEY = OFF, DROP_EXISTING = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
GO
SET ANSI_PADDING ON
GO
/****** Object:  Index [IX_opcdatapoint]    Script Date: 12.07.2024 15:19:33 ******/
CREATE UNIQUE NONCLUSTERED INDEX [IX_opcdatapoint] ON [dbo].[opcdatapoint]
(
	[name] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, IGNORE_DUP_KEY = ON, DROP_EXISTING = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
GO
SET ANSI_PADDING ON
GO
/****** Object:  Index [IX_opcgroup]    Script Date: 12.07.2024 15:19:33 ******/
CREATE UNIQUE NONCLUSTERED INDEX [IX_opcgroup] ON [dbo].[opcgroup]
(
	[id_opcserver] ASC,
	[name] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, IGNORE_DUP_KEY = ON, DROP_EXISTING = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
GO
SET ANSI_PADDING ON
GO
/****** Object:  Index [IX_opcserver]    Script Date: 12.07.2024 15:19:33 ******/
CREATE UNIQUE NONCLUSTERED INDEX [IX_opcserver] ON [dbo].[opcserver]
(
	[progid] ASC,
	[server] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, IGNORE_DUP_KEY = ON, DROP_EXISTING = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
GO
/****** Object:  Index [IX_rest_d1mini]    Script Date: 12.07.2024 15:19:33 ******/
CREATE UNIQUE NONCLUSTERED INDEX [IX_rest_d1mini] ON [dbo].[rest]
(
	[id_d1mini] ASC
)
WHERE ([id_d1mini] IS NOT NULL)
WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, IGNORE_DUP_KEY = OFF, DROP_EXISTING = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
GO
/****** Object:  Index [IX_rest_shelly]    Script Date: 12.07.2024 15:19:33 ******/
CREATE UNIQUE NONCLUSTERED INDEX [IX_rest_shelly] ON [dbo].[rest]
(
	[id_shelly] ASC
)
WHERE ([id_shelly] IS NOT NULL)
WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, IGNORE_DUP_KEY = OFF, DROP_EXISTING = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
GO
SET ANSI_PADDING ON
GO
/****** Object:  Index [IX_scene]    Script Date: 12.07.2024 15:19:33 ******/
CREATE UNIQUE NONCLUSTERED INDEX [IX_scene] ON [dbo].[scene]
(
	[name] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, IGNORE_DUP_KEY = OFF, DROP_EXISTING = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
GO
SET ANSI_PADDING ON
GO
/****** Object:  Index [IX_scenegroup]    Script Date: 12.07.2024 15:19:33 ******/
CREATE UNIQUE NONCLUSTERED INDEX [IX_scenegroup] ON [dbo].[scenegroup]
(
	[name] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, IGNORE_DUP_KEY = OFF, DROP_EXISTING = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
GO
/****** Object:  Index [IX_trend_dp]    Script Date: 12.07.2024 15:19:33 ******/
CREATE UNIQUE NONCLUSTERED INDEX [IX_trend_dp] ON [dbo].[trend]
(
	[id_dp] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, IGNORE_DUP_KEY = OFF, DROP_EXISTING = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
GO
SET ANSI_PADDING ON
GO
/****** Object:  Index [IX_trendcfg]    Script Date: 12.07.2024 15:19:33 ******/
CREATE UNIQUE NONCLUSTERED INDEX [IX_trendcfg] ON [dbo].[trendcfg]
(
	[id_user] ASC,
	[name] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, IGNORE_DUP_KEY = OFF, DROP_EXISTING = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
GO
SET ANSI_PADDING ON
GO
/****** Object:  Index [IX_trendgroup]    Script Date: 12.07.2024 15:19:33 ******/
CREATE UNIQUE NONCLUSTERED INDEX [IX_trendgroup] ON [dbo].[trendgroup]
(
	[name] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, IGNORE_DUP_KEY = OFF, DROP_EXISTING = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
GO
/****** Object:  Index [IX_trendvalue]    Script Date: 12.07.2024 15:19:33 ******/
CREATE UNIQUE NONCLUSTERED INDEX [IX_trendvalue] ON [dbo].[trendvalue]
(
	[id_trend] ASC,
	[time] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, IGNORE_DUP_KEY = OFF, DROP_EXISTING = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
GO
SET ANSI_PADDING ON
GO
/****** Object:  Index [IX_webpages]    Script Date: 12.07.2024 15:19:33 ******/
CREATE UNIQUE NONCLUSTERED INDEX [IX_webpages] ON [dbo].[webpages]
(
	[src] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, IGNORE_DUP_KEY = OFF, DROP_EXISTING = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
GO
ALTER TABLE [dbo].[alarm] ADD  CONSTRAINT [DF_alarm_id_alarmtype]  DEFAULT ((1)) FOR [id_alarmtype]
GO
ALTER TABLE [dbo].[alarm] ADD  CONSTRAINT [DF_alarm_id_alarmcondition]  DEFAULT ((1)) FOR [id_alarmcondition]
GO
ALTER TABLE [dbo].[alarm] ADD  CONSTRAINT [DF_alarm_min]  DEFAULT ('True') FOR [min]
GO
ALTER TABLE [dbo].[alarm] ADD  CONSTRAINT [DF_alarm_delay]  DEFAULT ((0)) FOR [delay]
GO
ALTER TABLE [dbo].[alarmtoemail] ADD  CONSTRAINT [DF_alarmtoemail_minutes]  DEFAULT ((0)) FOR [minutes]
GO
ALTER TABLE [dbo].[alarmtype] ADD  CONSTRAINT [DF_alarmtype_autoquit]  DEFAULT ((0)) FOR [autoquit]
GO
ALTER TABLE [dbo].[calendar] ADD  CONSTRAINT [DF_calendar_active]  DEFAULT ((1)) FOR [active]
GO
ALTER TABLE [dbo].[cookie] ADD  CONSTRAINT [DF_cookie_created]  DEFAULT (getdate()) FOR [created]
GO
ALTER TABLE [dbo].[cookie] ADD  CONSTRAINT [DF_cookie_version]  DEFAULT ((1)) FOR [version]
GO
ALTER TABLE [dbo].[d1mini] ADD  CONSTRAINT [DF_d1mini_active]  DEFAULT ((0)) FOR [active]
GO
ALTER TABLE [dbo].[d1minigroup] ADD  CONSTRAINT [DF_d1minigroup_active]  DEFAULT ((0)) FOR [active]
GO
ALTER TABLE [dbo].[dp] ADD  CONSTRAINT [DF_dp_min]  DEFAULT ((0)) FOR [min]
GO
ALTER TABLE [dbo].[dp] ADD  CONSTRAINT [DF_dp_max]  DEFAULT ((100)) FOR [max]
GO
ALTER TABLE [dbo].[dp] ADD  CONSTRAINT [DF_dp_factor]  DEFAULT ((1)) FOR [factor]
GO
ALTER TABLE [dbo].[dp] ADD  CONSTRAINT [DF_dp_active]  DEFAULT ((0)) FOR [active]
GO
ALTER TABLE [dbo].[dpgroup] ADD  CONSTRAINT [DF_dpgroup_active]  DEFAULT ((0)) FOR [active]
GO
ALTER TABLE [dbo].[dpnamespace] ADD  CONSTRAINT [DF_dpnamespace_usergroupwrite]  DEFAULT ((100)) FOR [usergroupwrite]
GO
ALTER TABLE [dbo].[dpnamespace] ADD  CONSTRAINT [DF_dpnamespace_active]  DEFAULT ((0)) FOR [active]
GO
ALTER TABLE [dbo].[email] ADD  CONSTRAINT [DF_email_ticketmail]  DEFAULT ((0)) FOR [ticketmail]
GO
ALTER TABLE [dbo].[email] ADD  CONSTRAINT [DF_email_duration]  DEFAULT ((0)) FOR [duration]
GO
ALTER TABLE [dbo].[email] ADD  CONSTRAINT [DF_email_sms]  DEFAULT ((0)) FOR [sms]
GO
ALTER TABLE [dbo].[gsync] ADD  CONSTRAINT [DF_gsync_active]  DEFAULT ((1)) FOR [active]
GO
ALTER TABLE [dbo].[gsyncevent] ADD  CONSTRAINT [DF_gsyncevent_flagnew]  DEFAULT ((0)) FOR [flagnew]
GO
ALTER TABLE [dbo].[gsyncevent] ADD  CONSTRAINT [DF_gsyncevent_flagupdate]  DEFAULT ((0)) FOR [flagupdate]
GO
ALTER TABLE [dbo].[gsyncevent] ADD  CONSTRAINT [DF_gsyncevent_flagdelete]  DEFAULT ((0)) FOR [flagdelete]
GO
ALTER TABLE [dbo].[mqttbroker] ADD  CONSTRAINT [DF_mqttdevice_port]  DEFAULT ((1883)) FOR [port]
GO
ALTER TABLE [dbo].[mqttgroup] ADD  CONSTRAINT [DF_mqttgroup_active]  DEFAULT ((0)) FOR [active]
GO
ALTER TABLE [dbo].[mqtttopic] ADD  CONSTRAINT [DF_mqtttopic_readable]  DEFAULT ((1)) FOR [readable]
GO
ALTER TABLE [dbo].[mqtttopic] ADD  CONSTRAINT [DF_mqtttopic_writeable]  DEFAULT ((0)) FOR [writeable]
GO
ALTER TABLE [dbo].[opcdatapoint] ADD  CONSTRAINT [DF_opcdatapoint_active]  DEFAULT ((0)) FOR [active]
GO
ALTER TABLE [dbo].[opcgroup] ADD  CONSTRAINT [DF_opcgroup_duration]  DEFAULT ((1000)) FOR [duration]
GO
ALTER TABLE [dbo].[opcgroup] ADD  CONSTRAINT [DF_opcgroup_active]  DEFAULT ((0)) FOR [active]
GO
ALTER TABLE [dbo].[opcserver] ADD  CONSTRAINT [DF_opcserver_active]  DEFAULT ((0)) FOR [active]
GO
ALTER TABLE [dbo].[shelly] ADD  CONSTRAINT [DF_shelly_mqtt_active]  DEFAULT ((0)) FOR [mqtt_active]
GO
ALTER TABLE [dbo].[shelly] ADD  CONSTRAINT [DF_shelly_autooff]  DEFAULT ((0)) FOR [autooff]
GO
ALTER TABLE [dbo].[shelly] ADD  CONSTRAINT [DF_shelly_active]  DEFAULT ((0)) FOR [active]
GO
ALTER TABLE [dbo].[trend] ADD  CONSTRAINT [DF_trend_intervall]  DEFAULT ((60)) FOR [intervall]
GO
ALTER TABLE [dbo].[trend] ADD  CONSTRAINT [DF_trend_max]  DEFAULT ((50400)) FOR [max]
GO
ALTER TABLE [dbo].[trend] ADD  CONSTRAINT [DF_trend_maxAge]  DEFAULT ((35)) FOR [maxAge]
GO
ALTER TABLE [dbo].[trend] ADD  CONSTRAINT [DF_trend_active]  DEFAULT ((0)) FOR [active]
GO
ALTER TABLE [dbo].[trendcfg] ADD  CONSTRAINT [DF_trendcfg_only1axes]  DEFAULT ((0)) FOR [only1axes]
GO
ALTER TABLE [dbo].[user] ADD  CONSTRAINT [DF_user_static]  DEFAULT ((0)) FOR [static]
GO
ALTER TABLE [dbo].[user] ADD  CONSTRAINT [DF_user_autologoff]  DEFAULT ((15)) FOR [autologoff]
GO
ALTER TABLE [dbo].[user] ADD  CONSTRAINT [DF_user_domainuser]  DEFAULT ((0)) FOR [domainuser]
GO
ALTER TABLE [dbo].[user] ADD  CONSTRAINT [DF_user_showpopup]  DEFAULT ((0)) FOR [showpopup]
GO
ALTER TABLE [dbo].[usergroup] ADD  CONSTRAINT [DF_usergroup_static]  DEFAULT ((0)) FOR [static]
GO
ALTER TABLE [dbo].[webpages] ADD  CONSTRAINT [DF_webpages_usergroupread]  DEFAULT ((1)) FOR [usergroupread]
GO
ALTER TABLE [dbo].[webpages] ADD  CONSTRAINT [DF_webpages_static]  DEFAULT ((0)) FOR [static]
GO
ALTER TABLE [dbo].[webpages] ADD  CONSTRAINT [DF_webpages_inwork]  DEFAULT ((0)) FOR [inwork]
GO
ALTER TABLE [dbo].[alarm]  WITH CHECK ADD  CONSTRAINT [FK_alarm_alarmcondition] FOREIGN KEY([id_alarmcondition])
REFERENCES [dbo].[alarmcondition] ([id_alarmcondition])
ON UPDATE CASCADE
ON DELETE CASCADE
GO
ALTER TABLE [dbo].[alarm] CHECK CONSTRAINT [FK_alarm_alarmcondition]
GO
ALTER TABLE [dbo].[alarm]  WITH CHECK ADD  CONSTRAINT [FK_alarm_alarmgroup] FOREIGN KEY([id_alarmgroup])
REFERENCES [dbo].[alarmgroup] ([id_alarmgroup])
ON UPDATE CASCADE
ON DELETE SET NULL
GO
ALTER TABLE [dbo].[alarm] CHECK CONSTRAINT [FK_alarm_alarmgroup]
GO
ALTER TABLE [dbo].[alarm]  WITH CHECK ADD  CONSTRAINT [FK_alarm_alarmgroups1] FOREIGN KEY([id_alarmgroups1])
REFERENCES [dbo].[alarmgroups1] ([id_alarmgroups1])
ON UPDATE CASCADE
ON DELETE SET NULL
GO
ALTER TABLE [dbo].[alarm] CHECK CONSTRAINT [FK_alarm_alarmgroups1]
GO
ALTER TABLE [dbo].[alarm]  WITH CHECK ADD  CONSTRAINT [FK_alarm_alarmgroups2] FOREIGN KEY([id_alarmgroups2])
REFERENCES [dbo].[alarmgroups2] ([id_alarmgroups2])
ON UPDATE CASCADE
ON DELETE SET NULL
GO
ALTER TABLE [dbo].[alarm] CHECK CONSTRAINT [FK_alarm_alarmgroups2]
GO
ALTER TABLE [dbo].[alarm]  WITH CHECK ADD  CONSTRAINT [FK_alarm_alarmgroups3] FOREIGN KEY([id_alarmgroups3])
REFERENCES [dbo].[alarmgroups3] ([id_alarmgroups3])
ON UPDATE CASCADE
ON DELETE SET NULL
GO
ALTER TABLE [dbo].[alarm] CHECK CONSTRAINT [FK_alarm_alarmgroups3]
GO
ALTER TABLE [dbo].[alarm]  WITH CHECK ADD  CONSTRAINT [FK_alarm_alarmgroups4] FOREIGN KEY([id_alarmgroups4])
REFERENCES [dbo].[alarmgroups4] ([id_alarmgroups4])
ON UPDATE CASCADE
ON DELETE SET NULL
GO
ALTER TABLE [dbo].[alarm] CHECK CONSTRAINT [FK_alarm_alarmgroups4]
GO
ALTER TABLE [dbo].[alarm]  WITH CHECK ADD  CONSTRAINT [FK_alarm_alarmgroups5] FOREIGN KEY([id_alarmgroups5])
REFERENCES [dbo].[alarmgroups5] ([id_alarmgroups5])
ON UPDATE CASCADE
ON DELETE SET NULL
GO
ALTER TABLE [dbo].[alarm] CHECK CONSTRAINT [FK_alarm_alarmgroups5]
GO
ALTER TABLE [dbo].[alarm]  WITH CHECK ADD  CONSTRAINT [FK_alarm_alarmtype] FOREIGN KEY([id_alarmtype])
REFERENCES [dbo].[alarmtype] ([id_alarmtype])
ON UPDATE CASCADE
ON DELETE CASCADE
GO
ALTER TABLE [dbo].[alarm] CHECK CONSTRAINT [FK_alarm_alarmtype]
GO
ALTER TABLE [dbo].[alarm]  WITH CHECK ADD  CONSTRAINT [FK_alarm_dp] FOREIGN KEY([id_dp])
REFERENCES [dbo].[dp] ([id_dp])
ON UPDATE CASCADE
ON DELETE CASCADE
GO
ALTER TABLE [dbo].[alarm] CHECK CONSTRAINT [FK_alarm_dp]
GO
ALTER TABLE [dbo].[alarmhistoric]  WITH CHECK ADD  CONSTRAINT [FK_alarmhistoric_alarm] FOREIGN KEY([id_alarm])
REFERENCES [dbo].[alarm] ([id_alarm])
ON UPDATE CASCADE
ON DELETE CASCADE
GO
ALTER TABLE [dbo].[alarmhistoric] CHECK CONSTRAINT [FK_alarmhistoric_alarm]
GO
ALTER TABLE [dbo].[alarmtoemail]  WITH CHECK ADD  CONSTRAINT [FK_alarmtoemail_alarm] FOREIGN KEY([id_alarm])
REFERENCES [dbo].[alarm] ([id_alarm])
ON UPDATE CASCADE
ON DELETE CASCADE
GO
ALTER TABLE [dbo].[alarmtoemail] CHECK CONSTRAINT [FK_alarmtoemail_alarm]
GO
ALTER TABLE [dbo].[alarmtoemail]  WITH CHECK ADD  CONSTRAINT [FK_alarmtoemail_email] FOREIGN KEY([id_email])
REFERENCES [dbo].[email] ([id_email])
ON UPDATE CASCADE
ON DELETE CASCADE
GO
ALTER TABLE [dbo].[alarmtoemail] CHECK CONSTRAINT [FK_alarmtoemail_email]
GO
ALTER TABLE [dbo].[calendar]  WITH CHECK ADD  CONSTRAINT [FK_calendar_calendargroup] FOREIGN KEY([id_calendargroup])
REFERENCES [dbo].[calendargroup] ([id_calendargroup])
ON UPDATE CASCADE
ON DELETE SET NULL
GO
ALTER TABLE [dbo].[calendar] CHECK CONSTRAINT [FK_calendar_calendargroup]
GO
ALTER TABLE [dbo].[calendar]  WITH CHECK ADD  CONSTRAINT [FK_calendar_dp] FOREIGN KEY([id_dp])
REFERENCES [dbo].[dp] ([id_dp])
ON UPDATE CASCADE
ON DELETE CASCADE
GO
ALTER TABLE [dbo].[calendar] CHECK CONSTRAINT [FK_calendar_dp]
GO
ALTER TABLE [dbo].[calendar]  WITH CHECK ADD  CONSTRAINT [FK_calendar_scenegroup] FOREIGN KEY([id_scenegroup])
REFERENCES [dbo].[scenegroup] ([id_scenegroup])
ON UPDATE CASCADE
ON DELETE CASCADE
GO
ALTER TABLE [dbo].[calendar] CHECK CONSTRAINT [FK_calendar_scenegroup]
GO
ALTER TABLE [dbo].[calendarevent]  WITH CHECK ADD  CONSTRAINT [FK_calendarevent_calendar] FOREIGN KEY([id_calendar])
REFERENCES [dbo].[calendar] ([id_calendar])
ON UPDATE CASCADE
ON DELETE CASCADE
GO
ALTER TABLE [dbo].[calendarevent] CHECK CONSTRAINT [FK_calendarevent_calendar]
GO
ALTER TABLE [dbo].[calendareventreminder]  WITH CHECK ADD  CONSTRAINT [FK_calendareventreminder_calendarevent] FOREIGN KEY([id_calendarevent])
REFERENCES [dbo].[calendarevent] ([id_calendarevent])
ON UPDATE CASCADE
ON DELETE CASCADE
GO
ALTER TABLE [dbo].[calendareventreminder] CHECK CONSTRAINT [FK_calendareventreminder_calendarevent]
GO
ALTER TABLE [dbo].[calendarexdate]  WITH CHECK ADD  CONSTRAINT [FK_calendarexdate_calendarrrule] FOREIGN KEY([id_calendarrrule])
REFERENCES [dbo].[calendarrrule] ([id_calendarrrule])
ON UPDATE CASCADE
ON DELETE CASCADE
GO
ALTER TABLE [dbo].[calendarexdate] CHECK CONSTRAINT [FK_calendarexdate_calendarrrule]
GO
ALTER TABLE [dbo].[calendarrrule]  WITH CHECK ADD  CONSTRAINT [FK_calendarrrule_calendarevent] FOREIGN KEY([id_calendarevent])
REFERENCES [dbo].[calendarevent] ([id_calendarevent])
ON UPDATE CASCADE
ON DELETE CASCADE
GO
ALTER TABLE [dbo].[calendarrrule] CHECK CONSTRAINT [FK_calendarrrule_calendarevent]
GO
ALTER TABLE [dbo].[calendartemplate]  WITH CHECK ADD  CONSTRAINT [FK_calendartemplate_calendar] FOREIGN KEY([id_calendar])
REFERENCES [dbo].[calendar] ([id_calendar])
ON UPDATE CASCADE
ON DELETE CASCADE
GO
ALTER TABLE [dbo].[calendartemplate] CHECK CONSTRAINT [FK_calendartemplate_calendar]
GO
ALTER TABLE [dbo].[calendartemplateevent]  WITH CHECK ADD  CONSTRAINT [FK_calendartemplateevent_calendartemplate] FOREIGN KEY([id_calendartemplate])
REFERENCES [dbo].[calendartemplate] ([id_calendartemplate])
ON UPDATE CASCADE
ON DELETE CASCADE
GO
ALTER TABLE [dbo].[calendartemplateevent] CHECK CONSTRAINT [FK_calendartemplateevent_calendartemplate]
GO
ALTER TABLE [dbo].[cfg]  WITH CHECK ADD  CONSTRAINT [FK_cfg_user] FOREIGN KEY([id_user])
REFERENCES [dbo].[user] ([id_user])
ON UPDATE CASCADE
ON DELETE CASCADE
GO
ALTER TABLE [dbo].[cfg] CHECK CONSTRAINT [FK_cfg_user]
GO
ALTER TABLE [dbo].[cookie]  WITH CHECK ADD  CONSTRAINT [FK_cookie_user] FOREIGN KEY([id_user])
REFERENCES [dbo].[user] ([id_user])
ON UPDATE CASCADE
ON DELETE CASCADE
GO
ALTER TABLE [dbo].[cookie] CHECK CONSTRAINT [FK_cookie_user]
GO
ALTER TABLE [dbo].[d1mini]  WITH CHECK ADD  CONSTRAINT [FK_d1mini_d1minigroup] FOREIGN KEY([id_d1minigroup])
REFERENCES [dbo].[d1minigroup] ([id_d1minigroup])
ON UPDATE CASCADE
ON DELETE SET NULL
GO
ALTER TABLE [dbo].[d1mini] CHECK CONSTRAINT [FK_d1mini_d1minigroup]
GO
ALTER TABLE [dbo].[dp]  WITH CHECK ADD  CONSTRAINT [FK_dpgroup_dp] FOREIGN KEY([id_dpgroup])
REFERENCES [dbo].[dpgroup] ([id_dpgroup])
ON UPDATE CASCADE
ON DELETE CASCADE
GO
ALTER TABLE [dbo].[dp] CHECK CONSTRAINT [FK_dpgroup_dp]
GO
ALTER TABLE [dbo].[dpgroup]  WITH CHECK ADD  CONSTRAINT [FK_dpgroup_dpnamespace] FOREIGN KEY([id_dpnamespace])
REFERENCES [dbo].[dpnamespace] ([id_dpnamespace])
ON UPDATE CASCADE
ON DELETE CASCADE
GO
ALTER TABLE [dbo].[dpgroup] CHECK CONSTRAINT [FK_dpgroup_dpnamespace]
GO
ALTER TABLE [dbo].[gsync]  WITH CHECK ADD  CONSTRAINT [FK_gsync_calendar] FOREIGN KEY([id_calendar])
REFERENCES [dbo].[calendar] ([id_calendar])
GO
ALTER TABLE [dbo].[gsync] CHECK CONSTRAINT [FK_gsync_calendar]
GO
ALTER TABLE [dbo].[gsync]  WITH CHECK ADD  CONSTRAINT [FK_gsync_sceneend] FOREIGN KEY([defaultend])
REFERENCES [dbo].[scene] ([id_scene])
GO
ALTER TABLE [dbo].[gsync] CHECK CONSTRAINT [FK_gsync_sceneend]
GO
ALTER TABLE [dbo].[gsync]  WITH CHECK ADD  CONSTRAINT [FK_gsync_scenereminder] FOREIGN KEY([defaultreminder])
REFERENCES [dbo].[scene] ([id_scene])
GO
ALTER TABLE [dbo].[gsync] CHECK CONSTRAINT [FK_gsync_scenereminder]
GO
ALTER TABLE [dbo].[gsync]  WITH CHECK ADD  CONSTRAINT [FK_gsync_scenestart] FOREIGN KEY([defaultstart])
REFERENCES [dbo].[scene] ([id_scene])
GO
ALTER TABLE [dbo].[gsync] CHECK CONSTRAINT [FK_gsync_scenestart]
GO
ALTER TABLE [dbo].[gsyncevent]  WITH CHECK ADD  CONSTRAINT [FK_gsyncevent_gsyncevent] FOREIGN KEY([id_gsyncevent])
REFERENCES [dbo].[gsyncevent] ([id_gsyncevent])
GO
ALTER TABLE [dbo].[gsyncevent] CHECK CONSTRAINT [FK_gsyncevent_gsyncevent]
GO
ALTER TABLE [dbo].[mqttgroup]  WITH CHECK ADD  CONSTRAINT [FK_mqttgroup_mqttbroker] FOREIGN KEY([id_mqttbroker])
REFERENCES [dbo].[mqttbroker] ([id_mqttbroker])
ON UPDATE CASCADE
ON DELETE CASCADE
GO
ALTER TABLE [dbo].[mqttgroup] CHECK CONSTRAINT [FK_mqttgroup_mqttbroker]
GO
ALTER TABLE [dbo].[mqtttopic]  WITH CHECK ADD  CONSTRAINT [FK_mqtttopic_d1mini] FOREIGN KEY([id_d1mini])
REFERENCES [dbo].[d1mini] ([id_d1mini])
ON UPDATE CASCADE
ON DELETE SET NULL
GO
ALTER TABLE [dbo].[mqtttopic] CHECK CONSTRAINT [FK_mqtttopic_d1mini]
GO
ALTER TABLE [dbo].[mqtttopic]  WITH CHECK ADD  CONSTRAINT [FK_mqtttopic_mqttgroup] FOREIGN KEY([id_mqttgroup])
REFERENCES [dbo].[mqttgroup] ([id_mqttgroup])
ON UPDATE CASCADE
ON DELETE CASCADE
GO
ALTER TABLE [dbo].[mqtttopic] CHECK CONSTRAINT [FK_mqtttopic_mqttgroup]
GO
ALTER TABLE [dbo].[mqtttopic]  WITH CHECK ADD  CONSTRAINT [FK_mqtttopic_shelly] FOREIGN KEY([id_shelly])
REFERENCES [dbo].[shelly] ([id_shelly])
ON UPDATE CASCADE
ON DELETE SET NULL
GO
ALTER TABLE [dbo].[mqtttopic] CHECK CONSTRAINT [FK_mqtttopic_shelly]
GO
ALTER TABLE [dbo].[opcdatapoint]  WITH CHECK ADD  CONSTRAINT [FK_opcdatapoint_opcgroup] FOREIGN KEY([id_opcgroup])
REFERENCES [dbo].[opcgroup] ([id_opcgroup])
ON UPDATE CASCADE
ON DELETE CASCADE
GO
ALTER TABLE [dbo].[opcdatapoint] CHECK CONSTRAINT [FK_opcdatapoint_opcgroup]
GO
ALTER TABLE [dbo].[opcgroup]  WITH CHECK ADD  CONSTRAINT [FK_opcgroup_opcserver] FOREIGN KEY([id_opcserver])
REFERENCES [dbo].[opcserver] ([id_opcserver])
ON UPDATE CASCADE
ON DELETE CASCADE
GO
ALTER TABLE [dbo].[opcgroup] CHECK CONSTRAINT [FK_opcgroup_opcserver]
GO
ALTER TABLE [dbo].[rest]  WITH CHECK ADD  CONSTRAINT [FK_rest_d1mini] FOREIGN KEY([id_d1mini])
REFERENCES [dbo].[d1mini] ([id_d1mini])
ON UPDATE CASCADE
ON DELETE CASCADE
GO
ALTER TABLE [dbo].[rest] CHECK CONSTRAINT [FK_rest_d1mini]
GO
ALTER TABLE [dbo].[rest]  WITH CHECK ADD  CONSTRAINT [FK_rest_shelly] FOREIGN KEY([id_shelly])
REFERENCES [dbo].[shelly] ([id_shelly])
ON UPDATE CASCADE
ON DELETE CASCADE
GO
ALTER TABLE [dbo].[rest] CHECK CONSTRAINT [FK_rest_shelly]
GO
ALTER TABLE [dbo].[router]  WITH CHECK ADD  CONSTRAINT [FK_router_dp] FOREIGN KEY([id_dp])
REFERENCES [dbo].[dp] ([id_dp])
ON UPDATE CASCADE
ON DELETE CASCADE
GO
ALTER TABLE [dbo].[router] CHECK CONSTRAINT [FK_router_dp]
GO
ALTER TABLE [dbo].[scene]  WITH CHECK ADD  CONSTRAINT [FK_scene_scenegroup] FOREIGN KEY([id_scenegroup])
REFERENCES [dbo].[scenegroup] ([id_scenegroup])
ON UPDATE CASCADE
ON DELETE SET NULL
GO
ALTER TABLE [dbo].[scene] CHECK CONSTRAINT [FK_scene_scenegroup]
GO
ALTER TABLE [dbo].[scenevalue]  WITH CHECK ADD  CONSTRAINT [FK_scenevalue_dp] FOREIGN KEY([id_dp])
REFERENCES [dbo].[dp] ([id_dp])
ON UPDATE CASCADE
ON DELETE CASCADE
GO
ALTER TABLE [dbo].[scenevalue] CHECK CONSTRAINT [FK_scenevalue_dp]
GO
ALTER TABLE [dbo].[scenevalue]  WITH CHECK ADD  CONSTRAINT [FK_scenevalue_scene] FOREIGN KEY([id_scene])
REFERENCES [dbo].[scene] ([id_scene])
ON UPDATE CASCADE
ON DELETE CASCADE
GO
ALTER TABLE [dbo].[scenevalue] CHECK CONSTRAINT [FK_scenevalue_scene]
GO
ALTER TABLE [dbo].[shelly]  WITH CHECK ADD  CONSTRAINT [FK_shelly_shellygroup] FOREIGN KEY([id_shellygroup])
REFERENCES [dbo].[shellygroup] ([id_shellygroup])
ON UPDATE CASCADE
ON DELETE SET NULL
GO
ALTER TABLE [dbo].[shelly] CHECK CONSTRAINT [FK_shelly_shellygroup]
GO
ALTER TABLE [dbo].[shelly]  WITH CHECK ADD  CONSTRAINT [FK_shelly_shellyroom] FOREIGN KEY([id_shellyroom])
REFERENCES [dbo].[shellyroom] ([id_shellyroom])
ON UPDATE CASCADE
ON DELETE CASCADE
GO
ALTER TABLE [dbo].[shelly] CHECK CONSTRAINT [FK_shelly_shellyroom]
GO
ALTER TABLE [dbo].[shellygroup]  WITH CHECK ADD  CONSTRAINT [FK_shellygroup_shelly] FOREIGN KEY([id_shellygroup])
REFERENCES [dbo].[shellygroup] ([id_shellygroup])
GO
ALTER TABLE [dbo].[shellygroup] CHECK CONSTRAINT [FK_shellygroup_shelly]
GO
ALTER TABLE [dbo].[trend]  WITH CHECK ADD  CONSTRAINT [FK_trend_dp] FOREIGN KEY([id_dp])
REFERENCES [dbo].[dp] ([id_dp])
ON UPDATE CASCADE
ON DELETE CASCADE
GO
ALTER TABLE [dbo].[trend] CHECK CONSTRAINT [FK_trend_dp]
GO
ALTER TABLE [dbo].[trend]  WITH CHECK ADD  CONSTRAINT [FK_trend_trendgroup] FOREIGN KEY([id_trendgroup])
REFERENCES [dbo].[trendgroup] ([id_trendgroup])
ON UPDATE CASCADE
ON DELETE SET NULL
GO
ALTER TABLE [dbo].[trend] CHECK CONSTRAINT [FK_trend_trendgroup]
GO
ALTER TABLE [dbo].[trendcfg]  WITH CHECK ADD  CONSTRAINT [FK_trendcfg_user] FOREIGN KEY([id_user])
REFERENCES [dbo].[user] ([id_user])
ON UPDATE CASCADE
ON DELETE CASCADE
GO
ALTER TABLE [dbo].[trendcfg] CHECK CONSTRAINT [FK_trendcfg_user]
GO
ALTER TABLE [dbo].[trendcfgtrend]  WITH CHECK ADD  CONSTRAINT [FK_trendcfgtrend_trend] FOREIGN KEY([id_trend])
REFERENCES [dbo].[trend] ([id_trend])
ON UPDATE CASCADE
ON DELETE CASCADE
GO
ALTER TABLE [dbo].[trendcfgtrend] CHECK CONSTRAINT [FK_trendcfgtrend_trend]
GO
ALTER TABLE [dbo].[trendcfgtrend]  WITH CHECK ADD  CONSTRAINT [FK_trendcfgtrend_trendcfg] FOREIGN KEY([id_trendcfg])
REFERENCES [dbo].[trendcfg] ([id_trendcfg])
ON UPDATE CASCADE
ON DELETE CASCADE
GO
ALTER TABLE [dbo].[trendcfgtrend] CHECK CONSTRAINT [FK_trendcfgtrend_trendcfg]
GO
ALTER TABLE [dbo].[trendvalue]  WITH CHECK ADD  CONSTRAINT [FK_trendvalue_trend] FOREIGN KEY([id_trend])
REFERENCES [dbo].[trend] ([id_trend])
ON UPDATE CASCADE
ON DELETE CASCADE
GO
ALTER TABLE [dbo].[trendvalue] CHECK CONSTRAINT [FK_trendvalue_trend]
GO
ALTER TABLE [dbo].[user]  WITH CHECK ADD  CONSTRAINT [FK_user_usergroup] FOREIGN KEY([id_usergroup])
REFERENCES [dbo].[usergroup] ([id_usergroup])
ON UPDATE CASCADE
ON DELETE CASCADE
GO
ALTER TABLE [dbo].[user] CHECK CONSTRAINT [FK_user_usergroup]
GO
