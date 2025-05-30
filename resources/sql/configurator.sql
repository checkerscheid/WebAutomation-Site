USE [WEBautomationCS.Entwicklung]
GO
/****** Object:  Table [dbo].[T_Boiler]    Script Date: 17.10.2018 15:22:36 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[T_Boiler](
	[ID_Boiler] [int] IDENTITY(1,1) NOT NULL,
	[ID_BoilerSite] [int] NULL,
	[Position] [int] NULL,
	[burner] [varchar](50) NULL,
	[supplyT] [varchar](50) NULL,
	[returnT] [bit] NULL,
	[boilerT] [bit] NULL,
	[stl] [bit] NULL,
	[pMax] [bit] NULL,
	[pMin] [bit] NULL,
	[returnPump] [varchar](50) NULL,
	[waterShort] [bit] NULL,
	[returnInc] [bit] NULL
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[T_BoilerSite]    Script Date: 17.10.2018 15:22:36 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[T_BoilerSite](
	[ID_BoilerSite] [int] IDENTITY(1,1) NOT NULL,
	[ID_Plant] [int] NOT NULL,
	[boilerCount] [int] NOT NULL,
	[hydSwitch] [bit] NULL,
	[heatExchanger] [bit] NULL,
	[secSupplyT] [bit] NULL,
	[secReturnT] [bit] NULL,
 CONSTRAINT [PK_T_BoilerSite_1] PRIMARY KEY CLUSTERED 
(
	[ID_BoilerSite] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[T_Buffer]    Script Date: 17.10.2018 15:22:36 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[T_Buffer](
	[ID_Boiler] [int] IDENTITY(1,1) NOT NULL,
	[ID_WaterTreatmentSite] [int] NOT NULL,
	[Position] [int] NOT NULL,
	[Safety_T_Limiter] [varchar](50) NOT NULL,
	[Top_T] [varchar](50) NOT NULL,
	[Mid_T] [varchar](50) NOT NULL,
	[Bot_T] [varchar](50) NOT NULL,
 CONSTRAINT [PK_T_Buffer] PRIMARY KEY CLUSTERED 
(
	[ID_Boiler] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, FILLFACTOR = 90) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[T_Circuit]    Script Date: 17.10.2018 15:22:36 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[T_Circuit](
	[ID_Circuit] [int] IDENTITY(1,1) NOT NULL,
	[ID_HeatingSite] [int] NOT NULL,
	[Position] [int] NOT NULL,
	[Name] [varchar](50) NOT NULL,
	[Type] [varchar](50) NOT NULL,
	[Pump] [varchar](50) NOT NULL,
	[ControlValve] [varchar](50) NOT NULL,
	[Thermostat] [varchar](50) NOT NULL,
	[RoomTemp] [varchar](50) NOT NULL,
	[Supply_T] [bit] NOT NULL,
	[Return_T] [varchar](50) NOT NULL,
	[Pump_EM] [bit] NOT NULL,
	[Pump_OM] [bit] NOT NULL,
	[Heat_Meter] [bit] NOT NULL,
	[ControlValvePosition] [varchar](50) NULL,
	[Damper] [bit] NULL,
	[Link] [varchar](50) NULL,
	[SP_Supply_T] [bit] NULL,
	[Schedule_DP] [varchar](50) NULL,
 CONSTRAINT [PK_T_Circuit] PRIMARY KEY CLUSTERED 
(
	[ID_Circuit] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, FILLFACTOR = 90) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[T_Exchanger]    Script Date: 17.10.2018 15:22:36 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[T_Exchanger](
	[ID_Exchanger] [int] IDENTITY(1,1) NOT NULL,
	[ID_ExchangerSite] [int] NOT NULL,
	[Position] [int] NOT NULL,
	[ControlValve] [varchar](50) NOT NULL,
	[Damper] [bit] NOT NULL,
	[Safety_T_Limiter] [bit] NOT NULL,
	[Monitor_Pmax] [bit] NOT NULL,
	[Monitor_Pmin] [bit] NOT NULL,
	[Pri_Supply_T] [bit] NOT NULL,
	[Pri_Return_T] [bit] NOT NULL,
	[Sec_Supply_T] [bit] NOT NULL,
	[Sec_Return_T] [bit] NOT NULL,
	[Supply_Pump] [varchar](50) NULL,
	[Return_Pump] [varchar](50) NULL,
	[Monitor_T] [bit] NULL,
	[pump] [varchar](50) NULL,
	[pumpPosition] [varchar](50) NULL,
 CONSTRAINT [PK_T_Exchanger] PRIMARY KEY CLUSTERED 
(
	[ID_Exchanger] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, FILLFACTOR = 90) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[T_ExchangerSite]    Script Date: 17.10.2018 15:22:36 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[T_ExchangerSite](
	[ID_ExchangerSite] [int] IDENTITY(1,1) NOT NULL,
	[ID_Plant] [int] NOT NULL,
	[Supply_P] [bit] NULL,
	[Return_P] [bit] NULL,
	[Supply_T] [bit] NULL,
	[Return_T] [bit] NULL,
	[SP_Supply_P] [bit] NULL,
	[SP_Return_P] [bit] NULL,
	[SP_Supply_T] [bit] NULL,
	[SP_Return_T] [bit] NULL,
	[Heat_Meter] [bit] NULL,
	[Exchangers] [int] NOT NULL,
 CONSTRAINT [PK_T_ExchangerSite] PRIMARY KEY CLUSTERED 
(
	[ID_ExchangerSite] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, FILLFACTOR = 90) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[T_FreshWaterSite]    Script Date: 17.10.2018 15:22:36 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[T_FreshWaterSite](
	[ID_FreshWaterSite] [int] IDENTITY(1,1) NOT NULL,
	[ID_WaterTreatmentSite] [int] NOT NULL,
	[Supply_T] [bit] NOT NULL,
	[DrinkWaterCold] [bit] NOT NULL,
	[DrinkWaterCirc] [bit] NOT NULL,
	[Desinfect] [varchar](50) NULL,
	[OperatingMessage] [varchar](50) NULL,
	[ErrorMessage] [varchar](50) NULL,
	[HeatRequestAI] [varchar](50) NULL,
	[HeatRequestDI] [varchar](50) NULL,
	[DrinkWaterWarm] [bit] NULL,
 CONSTRAINT [PK_T_FreshWaterSite] PRIMARY KEY CLUSTERED 
(
	[ID_FreshWaterSite] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, FILLFACTOR = 90) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[T_FreshWaterStation]    Script Date: 17.10.2018 15:22:36 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[T_FreshWaterStation](
	[ID_FreshWaterStation] [int] IDENTITY(1,1) NOT NULL,
	[ID_FreshWaterSite] [int] NOT NULL,
	[Position] [int] NOT NULL,
	[EnteringTemp] [bit] NOT NULL,
	[LeavingTemp] [bit] NOT NULL,
	[VolumeFlow] [bit] NOT NULL,
	[LoadingPump] [bit] NOT NULL,
 CONSTRAINT [PK_T_FreshWaterStation] PRIMARY KEY CLUSTERED 
(
	[ID_FreshWaterStation] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, FILLFACTOR = 90) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[T_HeatingSite]    Script Date: 17.10.2018 15:22:36 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[T_HeatingSite](
	[ID_HeatingSite] [int] IDENTITY(1,1) NOT NULL,
	[ID_Plant] [int] NOT NULL,
	[Number] [int] NOT NULL,
	[Circuits] [int] NOT NULL,
	[Mode] [varchar](50) NULL,
 CONSTRAINT [PK_T_HeatingSite] PRIMARY KEY CLUSTERED 
(
	[ID_HeatingSite] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, FILLFACTOR = 90) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[T_Navigation]    Script Date: 17.10.2018 15:22:36 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[T_Navigation](
	[ID_Navigation] [int] IDENTITY(1,1) NOT NULL,
	[ID_Plant] [int] NOT NULL,
	[SiteType] [varchar](50) NOT NULL,
	[ID_Site] [int] NOT NULL,
	[Previous] [int] NULL,
	[Next] [int] NULL,
	[Distributor1] [int] NULL,
	[Distributor2] [int] NULL,
	[Distributor3] [int] NULL,
	[PageName] [varchar](50) NULL
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[T_Plant]    Script Date: 17.10.2018 15:22:36 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[T_Plant](
	[ID_Plant] [int] IDENTITY(1,1) NOT NULL,
	[Navi6] [varchar](50) NULL,
	[Navi5] [varchar](50) NULL,
	[Navi4] [varchar](50) NULL,
	[Navi3] [varchar](50) NULL,
	[Navi2] [varchar](50) NULL,
	[Navi1] [varchar](50) NULL,
	[ISP] [varchar](50) NULL,
	[Controllername] [varchar](50) NULL,
	[Name] [varchar](50) NULL,
	[Code] [varchar](50) NULL,
	[AccessPath] [varchar](50) NOT NULL,
	[Overview] [bit] NOT NULL,
 CONSTRAINT [PK_T_Project] PRIMARY KEY CLUSTERED 
(
	[ID_Plant] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, FILLFACTOR = 90) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[T_WaterTreatmentSite]    Script Date: 17.10.2018 15:22:36 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[T_WaterTreatmentSite](
	[ID_WaterTreatmentSite] [int] IDENTITY(1,1) NOT NULL,
	[ID_Plant] [int] NOT NULL,
	[CircuitPosition] [int] NULL,
	[Number] [int] NOT NULL,
	[Type] [varchar](50) NULL,
	[Supply_Pump] [varchar](50) NULL,
	[Return_Pump] [varchar](50) NULL,
	[Supply_T] [bit] NULL,
	[Return_T] [bit] NULL,
	[Circulation] [bit] NULL,
	[pump] [varchar](50) NULL,
	[pumpPosition] [varchar](50) NULL,
 CONSTRAINT [PK_T_BoilerSite] PRIMARY KEY CLUSTERED 
(
	[ID_WaterTreatmentSite] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, FILLFACTOR = 90) ON [PRIMARY]
) ON [PRIMARY]
GO
ALTER TABLE [dbo].[T_Plant] ADD  CONSTRAINT [DF_T_Plant_Overview]  DEFAULT ((0)) FOR [Overview]
GO
ALTER TABLE [dbo].[T_Boiler]  WITH CHECK ADD  CONSTRAINT [FK_T_Boiler_T_BoilerSite] FOREIGN KEY([ID_BoilerSite])
REFERENCES [dbo].[T_BoilerSite] ([ID_BoilerSite])
ON UPDATE CASCADE
ON DELETE CASCADE
GO
ALTER TABLE [dbo].[T_Boiler] CHECK CONSTRAINT [FK_T_Boiler_T_BoilerSite]
GO
ALTER TABLE [dbo].[T_BoilerSite]  WITH CHECK ADD  CONSTRAINT [FK_T_BoilerSite_T_Plant] FOREIGN KEY([ID_Plant])
REFERENCES [dbo].[T_Plant] ([ID_Plant])
ON UPDATE CASCADE
ON DELETE CASCADE
GO
ALTER TABLE [dbo].[T_BoilerSite] CHECK CONSTRAINT [FK_T_BoilerSite_T_Plant]
GO
ALTER TABLE [dbo].[T_Buffer]  WITH CHECK ADD  CONSTRAINT [FK_T_Buffer_T_BoilerSite] FOREIGN KEY([ID_WaterTreatmentSite])
REFERENCES [dbo].[T_WaterTreatmentSite] ([ID_WaterTreatmentSite])
ON UPDATE CASCADE
ON DELETE CASCADE
GO
ALTER TABLE [dbo].[T_Buffer] CHECK CONSTRAINT [FK_T_Buffer_T_BoilerSite]
GO
ALTER TABLE [dbo].[T_Circuit]  WITH CHECK ADD  CONSTRAINT [FK_T_Circuit_T_HeatingSite] FOREIGN KEY([ID_HeatingSite])
REFERENCES [dbo].[T_HeatingSite] ([ID_HeatingSite])
ON UPDATE CASCADE
ON DELETE CASCADE
GO
ALTER TABLE [dbo].[T_Circuit] CHECK CONSTRAINT [FK_T_Circuit_T_HeatingSite]
GO
ALTER TABLE [dbo].[T_Exchanger]  WITH CHECK ADD  CONSTRAINT [FK_T_Exchanger_T_ExchangerSite] FOREIGN KEY([ID_ExchangerSite])
REFERENCES [dbo].[T_ExchangerSite] ([ID_ExchangerSite])
ON UPDATE CASCADE
ON DELETE CASCADE
GO
ALTER TABLE [dbo].[T_Exchanger] CHECK CONSTRAINT [FK_T_Exchanger_T_ExchangerSite]
GO
ALTER TABLE [dbo].[T_ExchangerSite]  WITH CHECK ADD  CONSTRAINT [FK_T_ExchangerSite_T_Project] FOREIGN KEY([ID_Plant])
REFERENCES [dbo].[T_Plant] ([ID_Plant])
ON UPDATE CASCADE
ON DELETE CASCADE
GO
ALTER TABLE [dbo].[T_ExchangerSite] CHECK CONSTRAINT [FK_T_ExchangerSite_T_Project]
GO
ALTER TABLE [dbo].[T_FreshWaterSite]  WITH CHECK ADD  CONSTRAINT [FK_T_FreshWaterSite_T_WaterTreatmentSite] FOREIGN KEY([ID_WaterTreatmentSite])
REFERENCES [dbo].[T_WaterTreatmentSite] ([ID_WaterTreatmentSite])
ON UPDATE CASCADE
ON DELETE CASCADE
GO
ALTER TABLE [dbo].[T_FreshWaterSite] CHECK CONSTRAINT [FK_T_FreshWaterSite_T_WaterTreatmentSite]
GO
ALTER TABLE [dbo].[T_FreshWaterStation]  WITH CHECK ADD  CONSTRAINT [FK_T_FreshWaterStation_T_FreshWaterSite] FOREIGN KEY([ID_FreshWaterSite])
REFERENCES [dbo].[T_FreshWaterSite] ([ID_FreshWaterSite])
ON UPDATE CASCADE
ON DELETE CASCADE
GO
ALTER TABLE [dbo].[T_FreshWaterStation] CHECK CONSTRAINT [FK_T_FreshWaterStation_T_FreshWaterSite]
GO
ALTER TABLE [dbo].[T_HeatingSite]  WITH CHECK ADD  CONSTRAINT [FK_T_HeatingSite_T_Project] FOREIGN KEY([ID_Plant])
REFERENCES [dbo].[T_Plant] ([ID_Plant])
ON UPDATE CASCADE
ON DELETE CASCADE
GO
ALTER TABLE [dbo].[T_HeatingSite] CHECK CONSTRAINT [FK_T_HeatingSite_T_Project]
GO
ALTER TABLE [dbo].[T_Navigation]  WITH CHECK ADD  CONSTRAINT [FK_T_Navigation_T_Plant] FOREIGN KEY([ID_Plant])
REFERENCES [dbo].[T_Plant] ([ID_Plant])
ON UPDATE CASCADE
ON DELETE CASCADE
GO
ALTER TABLE [dbo].[T_Navigation] CHECK CONSTRAINT [FK_T_Navigation_T_Plant]
GO
ALTER TABLE [dbo].[T_WaterTreatmentSite]  WITH CHECK ADD  CONSTRAINT [FK_T_BoilerSite_T_Project] FOREIGN KEY([ID_Plant])
REFERENCES [dbo].[T_Plant] ([ID_Plant])
ON UPDATE CASCADE
ON DELETE CASCADE
GO
ALTER TABLE [dbo].[T_WaterTreatmentSite] CHECK CONSTRAINT [FK_T_BoilerSite_T_Project]
GO
