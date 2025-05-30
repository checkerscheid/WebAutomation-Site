USE [WEBautomationCS]
GO
/****** Object:  Table [dbo].[gsync]    Script Date: 10.01.2019 11:58:29 ******/
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
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
/****** Object:  Table [dbo].[gsyncevent]    Script Date: 10.01.2019 11:58:29 ******/
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
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
ALTER TABLE [dbo].[gsync] ADD  CONSTRAINT [DF_gsync_active]  DEFAULT ((1)) FOR [active]
GO
ALTER TABLE [dbo].[gsyncevent] ADD  CONSTRAINT [DF_gsyncevent_flagnew]  DEFAULT ((0)) FOR [flagnew]
GO
ALTER TABLE [dbo].[gsyncevent] ADD  CONSTRAINT [DF_gsyncevent_flagupdate]  DEFAULT ((0)) FOR [flagupdate]
GO
ALTER TABLE [dbo].[gsyncevent] ADD  CONSTRAINT [DF_gsyncevent_flagdelete]  DEFAULT ((0)) FOR [flagdelete]
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
