import { useMemo, type Dispatch, type ReactNode, type SetStateAction } from 'react';
import type { CmsContent } from '../cms/schema';
import { AnalyticsDashboard } from '../features/admin/AnalyticsDashboard';
import { AdminLoadingView } from '../features/admin/AdminLoadingView';
import { AdminLoginView } from '../features/admin/AdminLoginView';
import { AdminWorkspace } from '../features/admin/AdminWorkspace';
import type { AdminTab } from '../features/admin/admin.constants';
import { HomeContentEditor } from '../features/admin/HomeContentEditor';
import { JournalEditor } from '../features/admin/JournalEditor';
import { PagesContentEditor } from '../features/admin/PagesContentEditor';
import { ProjectsEditor } from '../features/admin/ProjectsEditor';
import { SiteSettingsEditor } from '../features/admin/SiteSettingsEditor';
import { useAdminController } from '../features/admin/useAdminController';
import { usePageMeta } from '../hooks/usePageMeta';

function updateContent<Key extends keyof CmsContent>(
  setter: Dispatch<SetStateAction<CmsContent>>,
  key: Key,
  value: CmsContent[Key],
) {
  setter((current) => ({
    ...current,
    [key]: value,
  }));
}

export default function Admin() {
  const {
    activeTab,
    analytics,
    authState,
    content,
    feedback,
    handleLogin,
    handleLogout,
    handleSave,
    isRefreshing,
    isSaving,
    loadAdminState,
    password,
    setActiveTab,
    setContent,
    setPassword,
    setUsername,
    updatedAt,
    username,
  } = useAdminController();

  usePageMeta({
    title: 'Client editor',
    description: 'Protected client editor for Aura Studio website content.',
  });

  const editors = useMemo<Record<AdminTab, ReactNode>>(
    () => ({
      analytics: <AnalyticsDashboard analytics={analytics} />,
      home: (
        <HomeContentEditor
          home={content.home}
          onChange={(home) => updateContent(setContent, 'home', home)}
        />
      ),
      journal: (
        <JournalEditor
          posts={content.blogPosts}
          onChange={(blogPosts) => updateContent(setContent, 'blogPosts', blogPosts)}
        />
      ),
      pages: (
        <PagesContentEditor
          pages={content.pages}
          onChange={(pages) => updateContent(setContent, 'pages', pages)}
        />
      ),
      projects: (
        <ProjectsEditor
          projects={content.projects}
          onChange={(projects) => updateContent(setContent, 'projects', projects)}
        />
      ),
      site: (
        <SiteSettingsEditor
          site={content.site}
          onChange={(site) => updateContent(setContent, 'site', site)}
        />
      ),
    }),
    [analytics, content, setContent],
  );

  if (authState === 'loading') {
    return <AdminLoadingView />;
  }

  if (authState === 'unauthenticated') {
    return (
      <AdminLoginView
        feedback={feedback}
        onPasswordChange={setPassword}
        onSubmit={handleLogin}
        onUsernameChange={setUsername}
        password={password}
        username={username}
      />
    );
  }

  return (
    <AdminWorkspace
      activeTab={activeTab}
      feedback={feedback}
      isRefreshing={isRefreshing}
      isSaving={isSaving}
      onLogout={handleLogout}
      onRefresh={loadAdminState}
      onSave={handleSave}
      onTabChange={setActiveTab}
      updatedAt={updatedAt}
    >
      {editors[activeTab]}
    </AdminWorkspace>
  );
}
